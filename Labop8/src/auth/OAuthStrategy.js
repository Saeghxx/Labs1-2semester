import { AuthStrategy } from "./AuthStrategy.js";

export class OAuthStrategy extends AuthStrategy {
  constructor(token, refreshFn) {
    super();
    this.token = token;
    this.refreshFn = refreshFn;
  }

  async apply(headers = {}) {
    return {
      ...headers,
      Authorization: `Bearer ${this.token}`,
    };
  }

  async refresh() {
    this.token = await this.refreshFn();
    console.log("Token refreshed");
  }
}