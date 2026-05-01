export class AuthProxy {
  constructor(client, strategy) {
    this.client = client;
    this.strategy = strategy;
  }

  async request(req) {
    const headers = await this.strategy.apply(req.headers || {});

    try {
      return await this.client.request({
        ...req,
        headers,
      });
    } catch (err) {
    
      if (err.status === 401 && this.strategy.refresh) {
        await this.strategy.refresh();

        const newHeaders = await this.strategy.apply(req.headers || {});
        return this.client.request({ ...req, headers: newHeaders });
      }

      throw err;
    }
  }
}