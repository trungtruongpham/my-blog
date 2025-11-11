---
title: "Distributed Session Data in .NET 8"
description: "Build a distributed session sharing system using .NET 8, Docker, Nginx, and Redis"
date: "2024-01-01"
tags: ["dotnet", "redis", "nginx", "docker", "sessions", "microservices"]
---

For the past few years, microservices have grown popular and many teams have adopted them. During a migration from a monolith CMS to a micro-frontend architecture, distributed session data became a top priority.

In this post, we’ll build a distributed session data sharing system with .NET 8, Docker, Nginx, and Redis.

GitHub repository with complete code:

https://github.com/trungtruongpham/distributed-session

![Architecture overview](https://pub-103a884188154ce0be014e191930b9c3.r2.dev/distributedsession-1.webp)

## System components

1. Nginx  
   Used as a reverse proxy to route requests by path:

   - `/session` → SessionService
   - `/customer` → CustomerService

   Example: `http://localhost/session/data?key=abc` is routed to SessionService.

2. SessionService  
   A simple .NET API for session CRUD operations.

3. CustomerService  
   A business service that reads session data.

4. Redis  
   Acts as the session store for best performance.

5. Docker  
   All components are orchestrated via Docker Compose.

## Implement components

### 1. SessionService

Configure Redis connection in `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "Redis": "redis:6379,abortConnect=False"
  }
}
```

Register Redis as the session provider and enable sessions in `Program.cs`:

```csharp
using Microsoft.AspNetCore.DataProtection;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);
var redisConnectionString = builder.Configuration.GetConnectionString("redis") ?? "localhost";

// Data protection (optional but recommended)
builder.Services.AddDataProtection()
    .PersistKeysToStackExchangeRedis(ConnectionMultiplexer.Connect(redisConnectionString))
    .SetApplicationName("DistributedSessionDemo");

// Redis-backed cache for session
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.ConfigurationOptions = ConfigurationOptions.Parse(redisConnectionString);
});

// Enable session
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(1);
});

var app = builder.Build();

app.UseSession();

app.MapControllers();

app.Run();
```

Create a simple controller for writing and reading session data:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace SessionService.Controllers;

[ApiController]
[Route("")]
public class SessionController : ControllerBase
{
    [HttpPost("data")]
    public ActionResult AddSessionData(string key, string data)
    {
        HttpContext.Session.SetString(key, data);
        return Ok($"Write data to session with key:{key} and value: {data}");
    }

    [HttpGet("data")]
    public ActionResult GetSessionData([FromQuery] string key)
    {
        var result = HttpContext.Session.GetString(key);
        return Ok(result);
    }
}
```

### 2. CustomerService

Configured similarly to SessionService (Redis, session), but exposes a read endpoint:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace CustomerService.Controllers;

[ApiController]
[Route("")]
public class CustomerController : ControllerBase
{
    [HttpGet("data")]
    public IActionResult GetCustomerData(string key)
    {
        var customerCart = HttpContext.Session.GetString(key);
        Console.WriteLine(customerCart);
        return Ok(customerCart);
    }
}
```

### 3. Nginx

Proxy to each service and forward cookies:

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location /session/ {
        proxy_pass http://session-service:8080/;
        proxy_set_header Cookie $http_cookie;
    }

    location /customer/ {
        proxy_pass http://customer-service:8082/;
        proxy_set_header Cookie $http_cookie;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

### 4. Docker Compose

Run the full stack locally:

```yaml
version: "3.8"
services:
  session-service:
    container_name: session-service
    build:
      context: ./SessionService
      dockerfile: ./SessionService/Dockerfile
    ports:
      - "8080:8080"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=http://+:8080
    links:
      - "redis"
    networks:
      - internal

  customer-service:
    container_name: customer-service
    build:
      context: ./CustomerService
      dockerfile: ./CustomerService/Dockerfile
    ports:
      - "8082:8082"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=http://+:8082
    links:
      - "redis"
      - "session-service"
    networks:
      - internal

  nginx-proxy:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    restart: always
    depends_on:
      - session-service
    networks:
      - internal

  redis:
    image: redis:latest
    container_name: db
    ports:
      - "6379:6379"
    networks:
      - internal

networks:
  internal:
    driver: bridge
```

Start everything:

```bash
docker compose up -d
```

![Docker Compose stack running](https://pub-103a884188154ce0be014e191930b9c3.r2.dev/distributedsession-2.png)

## Testing

1. Add session data by calling SessionService (e.g., via Postman)
2. Verify the session data is persisted in Redis
3. Read the same session data from CustomerService

You can find a Postman collection in the repository.

![Testing session flow with Postman and Redis](https://pub-103a884188154ce0be014e191930b9c3.r2.dev/distributedsession-3.png)
![Testing session flow with Postman and Redis](https://pub-103a884188154ce0be014e191930b9c3.r2.dev/distributedsession-4.png)
![Testing session flow with Postman and Redis](https://pub-103a884188154ce0be014e191930b9c3.r2.dev/distributedsession-5.png)

## Pros and cons

**Pros**

- Single responsibility: Session logic is centralized in SessionService
- Scalability: Scale services independently; distribute load effectively
- Performance: Reading session directly from Redis reduces coupling and latency

**Cons**

- Complexity: More moving parts, more setup effort (especially for local dev)
- Data consistency: Ensure readers get the latest session state
- Security: Reading session data across multiple services requires careful threat modeling
- Potential deadlocks: Be cautious with cross-service flows

---

InvertDev - Trung Truong - 2024-01-01
