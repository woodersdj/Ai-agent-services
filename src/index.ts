import express, { Express, Request, Response, NextFunction } from 'express';
import { config } from './config/index.js';

const app: Express = express();

// Middleware
app.use(express.json());

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({
    error: err.message,
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
  });
});

// Service endpoints (stubs for now)
app.post('/api/cobol', (_req: Request, res: Response) => {
  res.json({ service: 'COBOL Mainframe Bridge', price: 0.5, currency: 'USDC' });
});

app.post('/api/erp', (_req: Request, res: Response) => {
  res.json({ service: 'SAP/Oracle ERP Connector', price: 0.15, currency: 'USDC' });
});

app.post('/api/ocr', (_req: Request, res: Response) => {
  res.json({ service: 'Document Intelligence OCR+AI', price: 0.1, currency: 'USDC' });
});

app.post('/api/etl', (_req: Request, res: Response) => {
  res.json({ service: 'Real-Time Data ETL', price: 0.01, currency: 'USDC' });
});

app.post('/api/modernize', (_req: Request, res: Response) => {
  res.json({ service: 'Code Modernization Agent', price: 1.0, currency: 'USDC' });
});

app.post('/api/compliance', (_req: Request, res: Response) => {
  res.json({ service: 'Compliance & Regulatory', price: 0.25, currency: 'USDC' });
});

app.post('/api/orchestrate', (_req: Request, res: Response) => {
  res.json({ service: 'Multi-Agent Orchestration', price: 0.05, currency: 'USDC' });
});

app.post('/api/anonymize', (_req: Request, res: Response) => {
  res.json({ service: 'Secure Data Anonymizer', price: 0.08, currency: 'USDC' });
});

app.post('/api/memory', (_req: Request, res: Response) => {
  res.json({ service: 'AI Agent Memory & Context', price: 0.03, currency: 'USDC' });
});

app.post('/api/synthetic', (_req: Request, res: Response) => {
  res.json({ service: 'Synthetic Test Data Generator', price: 0.2, currency: 'USDC' });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Banco de Manco Alpha Build running on port ${PORT}`);
  console.log(`📍 Environment: ${config.NODE_ENV}`);
  console.log(`💰 Primary Settlement: ${config.PAY_TO_ADDRESS}`);
  console.log(`🪙 Secondary Settlement: ${config.SECONDARY_PAY_TO_ADDRESS}`);
  console.log(`🌐 Network: ${config.NETWORK}`);
});
