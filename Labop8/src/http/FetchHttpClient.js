import { HttpClient } from "./HttpClient.js";

export class FetchHttpClient extends HttpClient {
  async request(req) {
    const res = await fetch(req.url, {
      method: req.method || "GET",
      headers: req.headers || {},
      body: req.body ? JSON.stringify(req.body) : undefined,
    });

    if (!res.ok) {
      const error = new Error("HTTP Error");
      error.status = res.status;
      throw error;
    }

    return res.json();
  }
}