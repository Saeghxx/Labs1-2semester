```md
# Lab 8: Authentication Proxy (Proxy + DI)

## Description

This lab implements the Proxy design pattern with Dependency Injection (DI) for handling authentication in an HTTP client system.

The goal is to build a clean layered architecture where authentication, logging, and request handling are separated into independent components.

---

## Architecture

### 1. Base HTTP Client
- Wrapper around `fetch`
- Sends HTTP requests only
- Has no authentication logic

### 2. Proxy Layer
- `AuthProxy` – adds authentication headers (JWT/API Key/OAuth)
- Handles optional token refresh on `401`
- `LoggingProxy` – logs requests and responses
- `RateLimitProxy` – limits request frequency (optional)

All proxies are composable and can be chained.

---

### 3. Service Layer
Example: `GitHubService`

- Receives `HttpClient` via constructor (DI)
- Does not know about authentication or proxy logic
- Uses only the provided interface

---

## Key Rules

- No authentication inside service layer
- No hardcoded dependencies
- Proxy receives client via constructor
- All dependencies are injected externally

---

## Example Setup

```js
new GitHubService(
  new LoggingProxy(
    new AuthProxy(baseClient, authStrategy)
  )
);
````

---

## Authentication

Supported strategies:

* JWT
* API Key
* OAuth (optional extension)

Each strategy can:

* Attach headers
* Refresh token (optional)

---

## Environment

Create `.env` file:


TOKEN=your_github_token


`.env` is excluded from Git repository.

---

## Conclusion

This lab demonstrates a modular Proxy-based architecture with clear separation of concerns and dependency injection.

---

## Author

Alina Retiznik

Igor Sikorsky Kyiv Polytechnic Institute  
Faculty of Informatics and Computer Engineering  
Group: IM-54  
GitHub: @Saeghxx
