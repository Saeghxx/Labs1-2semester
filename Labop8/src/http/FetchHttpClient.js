import { HttpClient } from "./HttpClient.js";

export class FetchHttpClient extends HttpClient {
  async request(req) {
    const res = await fetch(req.url, {
      method: req.method || "GET",
      headers: req.headers || {},
      body: req.body ? JSON.stringify(req.body) : undefined,
    });

    const data = await res.json();

    return {
      status: res.status,
      data,
    };
  }
}