import { AuthStrategy } from "./AuthStrategy.js";

export class ApiKeyStrategy extends AuthStrategy {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
  }

  async apply(headers = {}) {
    return {
      ...headers,
      "x-api-key": this.apiKey,
    };
  }
}