export class AuthProxy {
  constructor(client, strategy) {
    this.client = client;
    this.strategy = strategy;
  }

  async request(req) {
    const headers = await this.strategy.apply(req.headers || {});

    let response = await this.client.request({
      ...req,
      headers,
    });

    if (response.status === 401 && this.strategy.refresh) {
      const newToken = await this.strategy.refresh();

      const refreshedHeaders = await this.strategy.apply({
        ...(req.headers || {}),
        Authorization: `Bearer ${newToken}`,
      });

      response = await this.client.request({
        ...req,
        headers: refreshedHeaders,
      });
    }

    return response;
  }
}