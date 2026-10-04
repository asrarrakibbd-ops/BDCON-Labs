import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'server/data');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filename: string, defaultValue: T): T {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return defaultValue;
  }
}

function writeJsonFile<T>(filename: string, data: T) {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
  }
}

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  replied_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectRequestRecord {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_scope: string;
  budget_range: string;
  timeline: string;
  project_description: string;
  status: 'new' | 'reviewing' | 'contacted' | 'in_progress' | 'completed' | 'archived';
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface EngineeringInquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  project_type: string;
  project_location: string | null;
  estimated_area_sqft: number | null;
  service_requested: string;
  description: string;
  status: 'new' | 'reviewing' | 'contacted' | 'site_visit_scheduled' | 'proposal_sent' | 'archived';
  created_at: string;
  updated_at: string;
}

// -----------------------------------------------------------------------------
// Contact Messages Operations
// -----------------------------------------------------------------------------
export function getContactMessages(): ContactMessageRecord[] {
  return readJsonFile<ContactMessageRecord[]>('contact_messages.json', []);
}

export function saveContactMessage(record: Omit<ContactMessageRecord, 'id' | 'created_at' | 'updated_at' | 'replied_at'>): ContactMessageRecord {
  const messages = getContactMessages();
  const now = new Date().toISOString();
  const newRecord: ContactMessageRecord = {
    ...record,
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    replied_at: null,
    created_at: now,
    updated_at: now,
  };
  messages.unshift(newRecord);
  writeJsonFile('contact_messages.json', messages);
  return newRecord;
}

export function updateContactMessage(id: string, updates: Partial<ContactMessageRecord>): ContactMessageRecord | null {
  const messages = getContactMessages();
  const index = messages.findIndex(m => m.id === id);
  if (index === -1) return null;
  messages[index] = {
    ...messages[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  writeJsonFile('contact_messages.json', messages);
  return messages[index];
}

export function deleteContactMessage(id: string): boolean {
  const messages = getContactMessages();
  const filtered = messages.filter(m => m.id !== id);
  if (filtered.length === messages.length) return false;
  writeJsonFile('contact_messages.json', filtered);
  return true;
}

// -----------------------------------------------------------------------------
// Project Requests Operations
// -----------------------------------------------------------------------------
export function getProjectRequests(): ProjectRequestRecord[] {
  return readJsonFile<ProjectRequestRecord[]>('project_requests.json', []);
}

export function saveProjectRequest(record: Omit<ProjectRequestRecord, 'id' | 'created_at' | 'updated_at' | 'admin_notes'>): ProjectRequestRecord {
  const requests = getProjectRequests();
  const now = new Date().toISOString();
  const newRecord: ProjectRequestRecord = {
    ...record,
    id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    admin_notes: null,
    created_at: now,
    updated_at: now,
  };
  requests.unshift(newRecord);
  writeJsonFile('project_requests.json', requests);
  return newRecord;
}

export function updateProjectRequest(id: string, updates: Partial<ProjectRequestRecord>): ProjectRequestRecord | null {
  const requests = getProjectRequests();
  const index = requests.findIndex(r => r.id === id);
  if (index === -1) return null;
  requests[index] = {
    ...requests[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  writeJsonFile('project_requests.json', requests);
  return requests[index];
}

export function deleteProjectRequest(id: string): boolean {
  const requests = getProjectRequests();
  const filtered = requests.filter(r => r.id !== id);
  if (filtered.length === requests.length) return false;
  writeJsonFile('project_requests.json', filtered);
  return true;
}

// -----------------------------------------------------------------------------
// Engineering Inquiries Operations
// -----------------------------------------------------------------------------
export function getEngineeringInquiries(): EngineeringInquiryRecord[] {
  return readJsonFile<EngineeringInquiryRecord[]>('engineering_inquiries.json', []);
}

export function saveEngineeringInquiry(record: Omit<EngineeringInquiryRecord, 'id' | 'created_at' | 'updated_at'>): EngineeringInquiryRecord {
  const inquiries = getEngineeringInquiries();
  const now = new Date().toISOString();
  const newRecord: EngineeringInquiryRecord = {
    ...record,
    id: `eng_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    created_at: now,
    updated_at: now,
  };
  inquiries.unshift(newRecord);
  writeJsonFile('engineering_inquiries.json', inquiries);
  return newRecord;
}
