export class RateLimitProxy {
  constructor(client, delay = 500) {
    this.client = client;
    this.delay = delay;
    this.lastCall = 0;
  }

  async request(req) {
    const now = Date.now();

    if (now - this.lastCall < this.delay) {
      await new Promise(r => setTimeout(r, this.delay));
    }

    this.lastCall = Date.now();
    return this.client.request(req);
  }
}