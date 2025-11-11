---
title: "AzureFunction Development with HTTPS and CORS"
date: "2024-05-05"
author: "Invert Dev"
excerpt: "Essential tips for running Azure Functions with HTTPS and configuring CORS in local and test environments after a year of development experience."
tags: ["Azure", "Azure Function", "C#", "HTTPS", "CORS", "Development"]
---

After working with AzureFunction for over a year, I want to share some experiences to save you the time I spent learning.

## 1. Run AzureFunction with HTTPS

When developing BFF (Backend For Frontend) services, I encountered some cases where there was a need to run Azure Function with https. For example: A feature needed to use a cookie with the cookie option set to:

```csharp
var httpCookie = new IHttpCookie(name, value)
{
    SameSite = SameSite.None,
    Secure = true
}
```

With **Secure=true**, our Azure Function must run with HTTPS to append a cookie. I've discovered a simple method to run Azure Function with HTTPS by following these steps:

### Steps to Enable HTTPS

- Open Powershell as an administrator and navigate to your project folder:

```powershell
$cert = New-SelfSignedCertificate -Subject localhost -DnsName localhost -FriendlyName "Functions Development" -KeyUsage DigitalSignature -TextExtension @("2.5.29.37={text}1.3.6.1.5.5.7.3.1")

Export-PfxCertificate -Cert $cert -FilePath certificate.pfx -Password (ConvertTo-SecureString -String 123 -Force -AsPlainText)
```

- After executing the aforementioned commands, Powershell will generate a **certificate.pfx** file.
- Open your project's configuration and input the command to run the Azure Function:

```bash
host start --port 5007 --useHttps --cert certificate.pfx --password 123
```

**Note:** Please be aware that Rider will build our project and run in **bin/debug/net8.0** folder, so we need to copy **certificate.pfx** file to this folder.

## 2. Setup CORS for AzureFunction

During the development process with AzureFunction, I've encountered some issues related to CORS:

- In the local environment: I need to set CORS=\* to allow my coworkers to call my AzureFunction.
- In the test environment: I need to make it possible for my coworkers to call AzureFunction.

### Two Methods to Set CORS Values

There are two methods to set CORS values for AzureFunction:

1. **Add CORS value to local.settings.json:**

   - Configure CORS settings directly in your local configuration file
   - Allows for environment-specific CORS policies

2. **Add CORS value to build arguments:**
   - Pass CORS configuration during the build/run process
   - Useful for dynamic configuration

## Conclusion

In conclusion, developing with Azure Function presents unique challenges, but with the right knowledge, these can be easily overcome. Ensuring secure connections through HTTPS and setting up CORS correctly are crucial steps. By sharing these insights, I hope to help other developers navigate these aspects of Azure Function more easily. Always remember to closely follow documentation, keep up with updates, and exchange knowledge with your fellow developers. Happy coding!

---

_Source: [Invert Dev](https://invert-dev.com/2024/05/05/azurefunction-development-issues/)_
