// ==============================================================================
// BDCON Labs — Real-Time Inquiry Synchronization Engine
// Ensures zero-latency instant updates across all browser tabs, windows,
// and Supabase realtime postgres_changes subscriptions.
// ==============================================================================

import { supabase, isSupabaseConfigured } from '../supabase/client';

export type InquiryType = 'contact' | 'project' | 'engineering';

export interface InquiryEventDetail {
  type: InquiryType;
  action?: 'create' | 'update' | 'delete';
  id?: string;
  data?: any;
  timestamp: number;
}

const BROADCAST_CHANNEL_NAME = 'bdcon_realtime_inquiries';
const CUSTOM_EVENT_NAME = 'bdcon_inquiries_updated';

// Initialize native BroadcastChannel if supported
let broadcastChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
  } catch (err) {
    console.warn('BroadcastChannel initialization note:', err);
  }
}

/**
 * Broadcasts an inquiry event to all tabs, windows, and local listeners immediately
 */
export function broadcastInquiryUpdate(detail: Omit<InquiryEventDetail, 'timestamp'>): void {
  const fullDetail: InquiryEventDetail = {
    ...detail,
    timestamp: Date.now(),
  };

  // 1. Dispatch custom DOM event for current window
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_NAME, { detail: fullDetail }));
    } catch {
      // ignore
    }

    // 2. Touch localStorage ping to trigger 'storage' event across tabs
    try {
      localStorage.setItem('bdcon_last_inquiry_sync', JSON.stringify(fullDetail));
    } catch {
      // ignore
    }
  }

  // 3. Post to BroadcastChannel for modern cross-tab instant messaging
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage(fullDetail);
    } catch {
      // ignore
    }
  }
}

/**
 * Subscribes to all real-time inquiry events from:
 * 1. BroadcastChannel (cross-tab)
 * 2. Window CustomEvent (same-tab)
 * 3. LocalStorage storage event (cross-tab fallback)
 * 4. Supabase Realtime postgres_changes (cross-device database events)
 *
 * Returns an unsubscribe cleanup function.
 */
export function subscribeInquiryUpdates(
  onUpdate: (event: InquiryEventDetail) => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  // A. Local Window Event Listener
  const handleCustomEvent = (e: Event) => {
    const custom = e as CustomEvent<InquiryEventDetail>;
    if (custom.detail) {
      onUpdate(custom.detail);
    } else {
      onUpdate({ type: 'contact', timestamp: Date.now() });
    }
  };
  window.addEventListener(CUSTOM_EVENT_NAME, handleCustomEvent);

  // B. Cross-Tab BroadcastChannel Listener
  const handleBroadcastMessage = (e: MessageEvent) => {
    if (e.data && e.data.type) {
      onUpdate(e.data as InquiryEventDetail);
    }
  };
  if (broadcastChannel) {
    broadcastChannel.addEventListener('message', handleBroadcastMessage);
  }

  // C. Cross-Tab Storage Event Listener
  const handleStorage = (e: StorageEvent) => {
    if (
      e.key === 'bdcon_last_inquiry_sync' ||
      e.key === 'bdcon_local_contact_messages' ||
      e.key === 'bdcon_local_project_requests' ||
      e.key === 'bdcon_local_engineering_inquiries'
    ) {
      try {
        const parsed = e.newValue ? JSON.parse(e.newValue) : null;
        onUpdate(parsed || { type: 'contact', timestamp: Date.now() });
      } catch {
        onUpdate({ type: 'contact', timestamp: Date.now() });
      }
    }
  };
  window.addEventListener('storage', handleStorage);

  // D. Supabase Realtime Subscription (Cross-Device)
  let supabaseChannel: any = null;
  if (isSupabaseConfigured()) {
    try {
      supabaseChannel = supabase
        .channel(`realtime_inquiries_${Math.random().toString(36).substring(2, 7)}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'contact_messages' },
          (payload: any) => {
            onUpdate({
              type: 'contact',
              action: payload.eventType === 'INSERT' ? 'create' : payload.eventType === 'UPDATE' ? 'update' : 'delete',
              data: payload.new,
              timestamp: Date.now(),
            });
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'project_requests' },
          (payload: any) => {
            onUpdate({
              type: 'project',
              action: payload.eventType === 'INSERT' ? 'create' : payload.eventType === 'UPDATE' ? 'update' : 'delete',
              data: payload.new,
              timestamp: Date.now(),
            });
          }
        )
        .subscribe();
    } catch (err) {
      console.warn('Supabase Realtime subscription note:', err);
    }
  }

  // Cleanup handler
  return () => {
    window.removeEventListener(CUSTOM_EVENT_NAME, handleCustomEvent);
    if (broadcastChannel) {
      broadcastChannel.removeEventListener('message', handleBroadcastMessage);
    }
    window.removeEventListener('storage', handleStorage);
    if (supabaseChannel) {
      try {
        supabase.removeChannel(supabaseChannel);
      } catch {
        // ignore
      }
    }
  };
}
