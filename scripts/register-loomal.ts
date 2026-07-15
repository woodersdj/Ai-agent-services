// scripts/register-loomal.ts
import fs from "fs/promises";
import fetch from "node-fetch";
import { loadEnv } from "../src/config";

type ServiceDef = {
  id?: string;
  key: string;
  name: string;
  path: string;
  amountUsd: string;
  description?: string;
};

const services: ServiceDef[] = [
  { key: "cobol", name: "COBOL Mainframe Bridge", path: "/api/cobol", amountUsd: "0.50" },
  { key: "erp", name: "ERP Connector", path: "/api/erp", amountUsd: "0.15" },
  { key: "ocr", name: "Document OCR", path: "/api/ocr", amountUsd: "0.10" },
  { key: "etl", name: "Real-Time ETL", path: "/api/etl", amountUsd: "0.01" },
  { key: "modernize", name: "Code Modernization", path: "/api/modernize", amountUsd: "1.00" },
  { key: "compliance", name: "Compliance Checker", path: "/api/compliance", amountUsd: "0.25" },
  { key: "orchestrate", name: "Orchestration Router", path: "/api/orchestrate", amountUsd: "0.05" },
  { key: "anonymize", name: "Data Anonymizer", path: "/api/anonymize", amountUsd: "0.08" },
  { key: "memory", name: "Agent Memory", path: "/api/memory", amountUsd: "0.03" },
  { key: "synthetic", name: "Synthetic Data Generator", path: "/api/synthetic", amountUsd: "0.20" }
];

const RETRIES = 4;
const BACKOFF_BASE_MS = 500;

function sleep(ms: number) { return new Promise(res => setTimeout(res, ms)); }

async function requestWithRetries(url: string, opts: any, tries = RETRIES) {
  let attempt = 0;
  while (true) {
    try {
      const res = await fetch(url, opts);
      const text = await res.text();
      if (!res.ok) {
        const error = new Error(`HTTP ${res.status}: ${text}`);
        if (res.status >= 500 && attempt < tries) throw error;
        throw error;
      }
      return JSON.parse(text);
    } catch (err: any) {
      attempt++;
      if (attempt > tries) throw err;
      const backoff = BACKOFF_BASE_MS * Math.pow(2, attempt);
      console.warn(`Request failed (attempt ${attempt}), retrying in ${backoff}ms:`, err.message || err);
      await sleep(backoff);
    }
  }
}

async function upsertService(env: ReturnType<typeof loadEnv>, svc: ServiceDef) {
  const apiBase = process.env.LOOMAL_API_URL || "https://api.loomal.com/v1";
  const url = `${apiBase}/sellers`;
  const endpointUrl = env.SERVICE_BASE_URL.replace(/\/$/, "") + svc.path;

  try {
    const payload = {
      name: svc.name,
      key: svc.key,
      endpointUrl,
      amountUsd: svc.amountUsd,
      webhookUrl: env.SERVICE_BASE_URL.replace(/\/$/, "") + `/webhooks/loomal/${svc.key}`,
      metadata: { description: svc.description || "" }
    };

    const res = await requestWithRetries(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.LOOMAL_API_KEY}` },
      body: JSON.stringify(payload)
    });

    return { id: res.id, created: true, payload: res };
  } catch (err: any) {
    // try list by key
    try {
      const listUrl = `${apiBase}/sellers?key=${encodeURIComponent(svc.key)}`;
      const list = await requestWithRetries(listUrl, {
        method: "GET",
        headers: { Authorization: `Bearer ${env.LOOMAL_API_KEY}` }
      });
      const found = Array.isArray(list) && list.length ? list[0] : null;
      if (found) {
        const updateUrl = `${apiBase}/sellers/${found.id}`;
        const updated = await requestWithRetries(updateUrl, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.LOOMAL_API_KEY}` },
          body: JSON.stringify({
            endpointUrl,
            amountUsd: svc.amountUsd,
            webhookUrl: env.SERVICE_BASE_URL.replace(/\/$/, "") + `/webhooks/loomal/${svc.key}`
          })
        });
        return { id: found.id, created: false, payload: updated };
      }
    } catch (listErr) {
      // fall through
    }
    throw err;
  }
}

async function main() {
  const env = loadEnv();
  const mapping: Record<string, any> = {};
  for (const svc of services) {
    process.stdout.write(`Registering ${svc.key}... `);
    try {
      const result = await upsertService(env, svc);
      mapping[svc.key] = {
        id: result.id,
        created: result.created,
        endpoint: env.SERVICE_BASE_URL.replace(/\/$/, "") + svc.path,
        amountUsd: svc.amountUsd
      };
      console.log(`OK (id=${result.id})`);
    } catch (err: any) {
      console.error(`FAILED to register ${svc.key}:`, err.message || err);
      process.exit(2);
    }
  }

  await fs.writeFile("scripts/loomal-services.json", JSON.stringify(mapping, null, 2));
  console.log("Written scripts/loomal-services.json");
  console.log("All services registered/upserted successfully.");
}

if (require.main === module) {
  main().catch(err => { console.error("Registration script failed:", err); process.exit(1); });
}
