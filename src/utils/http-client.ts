import http from "http";
import https from "https";
import fetch, { RequestInit, Response } from "node-fetch";

const httpAgent = new http.Agent({ keepAlive: true, maxSockets: 50 });
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 50 });

export async function fetchWithAgent(url: string, opts: RequestInit = {}): Promise<Response> {
  const isHttps = url.startsWith("https:");
  const agent = isHttps ? httpsAgent : httpAgent;
  return fetch(url, { ...opts, agent });
}

export async function jsonFetch(url: string, opts: RequestInit = {}) {
  const res = await fetchWithAgent(url, opts);
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
  return JSON.parse(text);
}
