export class LoggingProxy {
  constructor(client) {
    this.client = client;
  }

  async request(req) {
    console.log("[LOG] Request:", req.url);

    const res = await this.client.request(req);

    console.log("[LOG] Response received");
    return res;
  }
}