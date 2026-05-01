import { AuthStrategy } from "./AuthStrategy.js";

export class JwtStrategy extends AuthStrategy {
  constructor(token) {
    super();
    this.token = token;
  }

  async apply(headers = {}) {
    return {
      ...headers,
      Authorization: `Bearer ${this.token}`,
    };
  }
}