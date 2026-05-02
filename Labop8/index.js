import "dotenv/config";

import { FetchHttpClient } from "./src/http/FetchHttpClient.js";

import { AuthProxy } from "./src/proxy/AuthProxy.js";
import { LoggingProxy } from "./src/proxy/LoggingProxy.js";
import { RateLimitProxy } from "./src/proxy/RateLimitProxy.js";

import { JwtStrategy } from "./src/auth/JwtStrategy.js";
import { ApiKeyStrategy } from "./src/auth/ApiKeyStrategy.js";
import { OAuthStrategy } from "./src/auth/OAuthStrategy.js";

import { GitHubService } from "./src/services/GitHubService.js";

function createAuthStrategy() {
  const type = process.env.AUTH_TYPE;

  if (type === "jwt") {
    return new JwtStrategy(process.env.TOKEN);
  }

  if (type === "apikey") {
    return new ApiKeyStrategy(process.env.API_KEY);
  }

  if (type === "oauth") {
    return new OAuthStrategy(
      process.env.OAUTH_TOKEN,
      async () => "refreshed-token"
    );
  }

  throw new Error("Unknown AUTH_TYPE");
}

async function main() {
  const baseClient = new FetchHttpClient();

  const authStrategy = createAuthStrategy();

  const client =
    new LoggingProxy(
      new RateLimitProxy(
        new AuthProxy(baseClient, authStrategy)
      )
    );

  const github = new GitHubService(client);

  const user = await github.getUser("octocat");
  console.log(user);
}

main();
