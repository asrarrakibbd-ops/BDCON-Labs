import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import {
  getContactMessages,
  saveContactMessage,
  updateContactMessage,
  deleteContactMessage,
  getProjectRequests,
  saveProjectRequest,
  updateProjectRequest,
  deleteProjectRequest,
  getEngineeringInquiries,
  saveEngineeringInquiry,
  getStoredBooks,
  saveStoredBook,
  updateStoredBook,
  deleteStoredBook,
  getStoredWriting,
  saveStoredWriting,
  updateStoredWriting,
  deleteStoredWriting,
  getStoredPortfolio,
  saveStoredPortfolio,
  updateStoredPortfolio,
  deleteStoredPortfolio,
  getStoredServices,
  saveStoredService,
  updateStoredService,
  deleteStoredService,
  getStoredProducts,
  saveStoredProduct,
  updateStoredProduct,
  deleteStoredProduct,
} from './server/storage';

dotenv.config();

// In AI Studio, the frontend dev server must listen on port 3000.
// Cloud Run sets PORT=8080 for the outer ingress/nginx container.
const PORT = 3000;
const app = express();

app.use(express.json());

// Initialize Supabase client if configured
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// =============================================================================
// Public Inquiries Endpoints
// =============================================================================

// 1. Submit Contact Message
app.post('/api/inquiries/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message, honeypot } = req.body;

    // Honeypot anti-spam check
    if (honeypot && String(honeypot).trim().length > 0) {
      return res.json({ success: true, id: 'trapped' });
    }

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, subject, and message are required.' });
    }

    // Save to persistent server storage
    const record = saveContactMessage({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : null,
      subject: String(subject).trim(),
      message: String(message).trim(),
      status: 'new',
    });

    // Also push to Supabase asynchronously
    if (supabase) {
      (async () => {
        try {
          const { error } = await supabase.from('contact_messages').insert([{
            name: record.name,
            email: record.email,
            phone: record.phone,
            subject: record.subject,
            message: record.message,
            status: 'new',
          }]);
          if (error) console.warn('[Supabase Sync] Contact message error:', error.message);
        } catch (err: any) {
          console.warn('[Supabase Sync] Network error:', err?.message || err);
        }
      })();
    }

    return res.json({ success: true, data: record });
  } catch (err: any) {
    console.error('Error handling contact submission:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 2. Submit Project Request (/start-project)
app.post('/api/inquiries/project', async (req, res) => {
  try {
    const { name, email, phone, company, project_scope, budget_range, timeline, project_description, honeypot } = req.body;

    // Honeypot anti-spam check
    if (honeypot && String(honeypot).trim().length > 0) {
      return res.json({ success: true, id: 'trapped' });
    }

    if (!name || !email || !project_scope || !project_description) {
      return res.status(400).json({ success: false, error: 'Name, email, project scope, and description are required.' });
    }

    // Save to persistent server storage
    const record = saveProjectRequest({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : null,
      company: company ? String(company).trim() : null,
      project_scope: String(project_scope).trim(),
      budget_range: String(budget_range || 'undecided').trim(),
      timeline: String(timeline || 'flexible').trim(),
      project_description: String(project_description).trim(),
      status: 'new',
    });

    // Also push to Supabase asynchronously
    if (supabase) {
      (async () => {
        try {
          const { error } = await supabase.from('project_requests').insert([{
            name: record.name,
            email: record.email,
            phone: record.phone,
            company: record.company,
            project_scope: record.project_scope,
            budget_range: record.budget_range,
            timeline: record.timeline,
            project_description: record.project_description,
            status: 'new',
          }]);
          if (error) console.warn('[Supabase Sync] Project request error:', error.message);
        } catch (err: any) {
          console.warn('[Supabase Sync] Network error:', err?.message || err);
        }
      })();
    }

    return res.json({ success: true, data: record });
  } catch (err: any) {
    console.error('Error handling project request submission:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// 3. Submit Engineering Inquiry (/engineering/contact)
app.post('/api/inquiries/engineering', async (req, res) => {
  try {
    const { name, email, phone, project_type, project_location, estimated_area_sqft, service_requested, description, honeypot } = req.body;

    if (honeypot && String(honeypot).trim().length > 0) {
      return res.json({ success: true, id: 'trapped' });
    }

    if (!name || !email || !service_requested || !description) {
      return res.status(400).json({ success: false, error: 'Name, email, service requested, and description are required.' });
    }

    const record = saveEngineeringInquiry({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : null,
      project_type: String(project_type || 'residential').trim(),
      project_location: project_location ? String(project_location).trim() : null,
      estimated_area_sqft: estimated_area_sqft ? Number(estimated_area_sqft) : null,
      service_requested: String(service_requested).trim(),
      description: String(description).trim(),
      status: 'new',
    });

    if (supabase) {
      (async () => {
        try {
          const { error } = await supabase.from('engineering_inquiries').insert([{
            name: record.name,
            email: record.email,
            phone: record.phone,
            project_type: record.project_type,
            project_location: record.project_location,
            estimated_area_sqft: record.estimated_area_sqft,
            service_requested: record.service_requested,
            description: record.description,
            status: 'new',
          }]);
          if (error) console.warn('[Supabase Sync] Engineering inquiry error:', error.message);
        } catch (err: any) {
          console.warn('[Supabase Sync] Network error:', err?.message || err);
        }
      })();
    }

    return res.json({ success: true, data: record });
  } catch (err: any) {
    console.error('Error handling engineering inquiry:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// =============================================================================
// Admin Inquiries & Statistics Endpoints
// =============================================================================

// 4. Admin Dashboard Stats
app.get('/api/admin/stats', (req, res) => {
  const messages = getContactMessages();
  const projects = getProjectRequests();

  const newContactMessages = messages.filter(m => m.status === 'new').length;
  const newProjectRequests = projects.filter(p => p.status === 'new').length;

  res.json({
    success: true,
    data: {
      newProjectRequests,
      totalProjectRequests: projects.length,
      newContactMessages,
      totalContactMessages: messages.length,
      totalProducts: 4,
      totalServices: 6,
      totalPortfolio: 6,
      totalBooks: 4,
      totalWriting: 10,
    },
  });
});

// 5. Admin Contact Messages List
app.get('/api/admin/contact-messages', (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 20));
  const status = req.query.status as string | undefined;
  const search = req.query.search as string | undefined;

  let list = getContactMessages();

  if (status && status !== 'all') {
    list = list.filter(m => m.status === status);
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  }

  const total = list.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const from = (page - 1) * pageSize;
  const paginated = list.slice(from, from + pageSize);

  res.json({
    data: paginated,
    total,
    page,
    pageSize,
    totalPages,
  });
});

// 6. Admin Update Contact Message Status
app.patch('/api/admin/contact-messages/:id', (req, res) => {
  const { id } = req.params;
  const { status, replied_at } = req.body;

  const updated = updateContactMessage(id, {
    ...(status && { status }),
    ...(replied_at !== undefined && { replied_at }),
  });

  if (!updated) {
    return res.status(404).json({ success: false, error: 'Message not found' });
  }

  return res.json({ success: true, data: updated });
});

// 7. Admin Delete Contact Message
app.delete('/api/admin/contact-messages/:id', (req, res) => {
  const { id } = req.params;
  const deleted = deleteContactMessage(id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Message not found' });
  }
  return res.json({ success: true });
});

// 8. Admin Project Requests List
app.get('/api/admin/project-requests', (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 20));
  const status = req.query.status as string | undefined;
  const search = req.query.search as string | undefined;

  let list = getProjectRequests();

  if (status && status !== 'all') {
    list = list.filter(p => p.status === status);
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      (p.company && p.company.toLowerCase().includes(q)) ||
      p.project_description.toLowerCase().includes(q)
    );
  }

  const total = list.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const from = (page - 1) * pageSize;
  const paginated = list.slice(from, from + pageSize);

  res.json({
    data: paginated,
    total,
    page,
    pageSize,
    totalPages,
  });
});

// 9. Admin Update Project Request Status
app.patch('/api/admin/project-requests/:id', (req, res) => {
  const { id } = req.params;
  const { status, admin_notes } = req.body;

  const updated = updateProjectRequest(id, {
    ...(status && { status }),
    ...(admin_notes !== undefined && { admin_notes }),
  });

  if (!updated) {
    return res.status(404).json({ success: false, error: 'Project request not found' });
  }

  return res.json({ success: true, data: updated });
});

// 10. Admin Delete Project Request
app.delete('/api/admin/project-requests/:id', (req, res) => {
  const { id } = req.params;
  const deleted = deleteProjectRequest(id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Project request not found' });
  }
  return res.json({ success: true });
});

// -----------------------------------------------------------------------------
// 11. Admin Books Management Endpoints
// -----------------------------------------------------------------------------
app.get('/api/admin/books', (_req, res) => {
  res.json({ success: true, data: getStoredBooks() });
});

app.post('/api/admin/books', (req, res) => {
  const book = saveStoredBook(req.body);
  res.json({ success: true, data: book });
});

app.patch('/api/admin/books/:id', (req, res) => {
  const updated = updateStoredBook(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Book not found' });
  res.json({ success: true, data: updated });
});

app.delete('/api/admin/books/:id', (req, res) => {
  const ok = deleteStoredBook(req.params.id);
  res.json({ success: ok });
});

// -----------------------------------------------------------------------------
// 12. Admin Writing / Blog Management Endpoints
// -----------------------------------------------------------------------------
app.get('/api/admin/writing', (_req, res) => {
  res.json({ success: true, data: getStoredWriting() });
});

app.post('/api/admin/writing', (req, res) => {
  const entry = saveStoredWriting(req.body);
  res.json({ success: true, data: entry });
});

app.patch('/api/admin/writing/:id', (req, res) => {
  const updated = updateStoredWriting(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Writing entry not found' });
  res.json({ success: true, data: updated });
});

app.delete('/api/admin/writing/:id', (req, res) => {
  const ok = deleteStoredWriting(req.params.id);
  res.json({ success: ok });
});

// -----------------------------------------------------------------------------
// 13. Admin Portfolio Projects Endpoints
// -----------------------------------------------------------------------------
app.get('/api/admin/portfolio', (_req, res) => {
  res.json({ success: true, data: getStoredPortfolio() });
});

app.post('/api/admin/portfolio', (req, res) => {
  const project = saveStoredPortfolio(req.body);
  res.json({ success: true, data: project });
});

app.patch('/api/admin/portfolio/:id', (req, res) => {
  const updated = updateStoredPortfolio(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Project not found' });
  res.json({ success: true, data: updated });
});

app.delete('/api/admin/portfolio/:id', (req, res) => {
  const ok = deleteStoredPortfolio(req.params.id);
  res.json({ success: ok });
});

// -----------------------------------------------------------------------------
// 14. Admin Services Endpoints
// -----------------------------------------------------------------------------
app.get('/api/admin/services', (_req, res) => {
  res.json({ success: true, data: getStoredServices() });
});

app.post('/api/admin/services', (req, res) => {
  const service = saveStoredService(req.body);
  res.json({ success: true, data: service });
});

app.patch('/api/admin/services/:id', (req, res) => {
  const updated = updateStoredService(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Service not found' });
  res.json({ success: true, data: updated });
});

app.delete('/api/admin/services/:id', (req, res) => {
  const ok = deleteStoredService(req.params.id);
  res.json({ success: ok });
});

// -----------------------------------------------------------------------------
// 15. Admin Products Endpoints
// -----------------------------------------------------------------------------
app.get('/api/admin/products', (_req, res) => {
  res.json({ success: true, data: getStoredProducts() });
});

app.post('/api/admin/products', (req, res) => {
  const product = saveStoredProduct(req.body);
  res.json({ success: true, data: product });
});

app.patch('/api/admin/products/:id', (req, res) => {
  const updated = updateStoredProduct(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Product not found' });
  res.json({ success: true, data: updated });
});

app.delete('/api/admin/products/:id', (req, res) => {
  const ok = deleteStoredProduct(req.params.id);
  res.json({ success: ok });
});

// =============================================================================
// Server Entry & Vite Integration
// =============================================================================
async function start() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[BDCON Labs] Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
