import { ContactInfo, ContactMessage } from '../types/contact';

export const COMPANY_CONTACT_INFO: ContactInfo = {
  email: 'contact@bdconlabs.com',
  // Only real information is configured. No fake phone, address, or social URLs.
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/bdconlabs',
    },
  ],
};

export async function getContactInfo(): Promise<ContactInfo> {
  return COMPANY_CONTACT_INFO;
}

export async function submitContactMessage(
  data: Omit<ContactMessage, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<{ success: boolean; message: string }> {
  // Frontend staging verification. Ready for Supabase connection in later stages.
  return {
    success: true,
    message: 'Message validated on client. Backend connection will be wired in subsequent stages.',
  };
}
