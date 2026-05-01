export class GitHubService {
  constructor(httpClient) {
    this.http = httpClient;
  }

  async getUser(username) {
    return this.http.request({
      url: `https://api.github.com/users/${username}`,
    });
  }
}