[next js Backend for Frontend-BFF route](#top)

- [a Server-Side BFF route](#a-server-side-bff-route)
  - [Next.js Pages Router Implementation (API Routes)](#nextjs-pages-router-implementation-api-routes)
  - [Next.js Pages Router BFF Route with Axios](#nextjs-pages-router-bff-route-with-axios)
- [In Production env](#in-production-env)
  - [On Vercel](#on-vercel)
  - [On Traditional Node Deployment](#on-traditional-node-deployment)
  - [Authentication - he backend trusts the BFF instead of every browser request](#authentication---he-backend-trusts-the-bff-instead-of-every-browser-request)
  - [Database Access](#database-access)


## A Server-Side BFF (Backend for Frontend) route

- is a dedicated API endpoint built to serve a specific client, acting as a secure middle-man between frontend and downstream microservices
- BFF should add frontend-specific business logic:  handles data aggregation, transformation, and security (e.g., OAuth token management), keeping frontend thin and secure

```
nextJS
[ React Frontend ]
        │
        ▼ (AJAX/Fetch)
[ Server-Side BFF Route ]  <-- (Hides API keys & handles Auth)
        │
        ▼ (Internal Network)
[ Core Backend / Microservices ]
```

```
Browser
   |
   v
BFF
   ├─ Auth
   ├─ Validation
   ├─ Aggregation
   └─ Transformation
   |
   v
Services
```

[🚀back to top](#top)

## Best Practices for BFF Routes

- **Client-Channel Alignment**: Ensure build distinct BFF routes for different user experiences (e.g., separate BFF endpoints or distinct BFF microservices for Web vs. Mobile).
- **Keep Them Thin**: Do not put core business logic in the BFF; only use it for data mapping, payload aggregation, and UI-specific formatting.
- **Team Ownership**: Ideally, the frontend team should own and maintain the BFF code so they can iterate on APIs as the UI changes.
- **Security & Auth**: Use the BFF to execute the Authorization Code flow. The BFF retains the tokens and sets a secure, HTTP-only cookie with the user's session state

## Next.js

## a Server-Side BFF route

- is implemented using API Routes (Pages Router) or Route Handlers (App Router).
-  n entirely on the server, allowing you to securely fetch data, hide API secrets, and format payloads before they reach the client

```ts
// app/api/dashboard/route.ts
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  try {
    // 1. Grab cookies or authorization headers from the client request if needed
    const cookieHeader = request.headers.get('cookie') || '';

    // 2. Fetch data from downstream microservices concurrently using server-only environment variables
    const [userRes, metricsRes] = await Promise.all([
      fetch(`${process.env.INTERNAL_API_URL}/v1/user/profile`, {
        headers: {
          'Authorization': `Bearer ${process.env.INTERNAL_MICROSERVICE_KEY}`,
          'Cookie': cookieHeader
        },
      }),
      fetch(`${process.env.INTERNAL_API_URL}/v1/analytics/metrics`, {
        headers: { 'Authorization': `Bearer ${process.env.INTERNAL_MICROSERVICE_KEY}` },
      }),
    ]);

    if (!userRes.ok || !metricsRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch downstream data' }, { status: 502 });
    }

    const userData = await userRes.json();
    const metricsData = await metricsRes.json();

    // 3. BFF Data Transformation: Filter and shape the payload specifically for the frontend UI
    const bffPayload = {
      username: userData.displayName,
      avatar: userData.profileImage,
      stats: {
        totalViews: metricsData.summary.views,
        activeAlerts: metricsData.alerts.filter((a: any) => a.status === 'active').length,
      },
    };
    // 4. Return clean, optimized data to the Next.js client
    return NextResponse.json(bffPayload);
  } catch (error) {
    console.error('BFF Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

### Next.js Pages Router Implementation (API Routes)

- using the older Pages Router, the implementation uses standard Node.js request/response objects

```ts
// pages/api/dashboard.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const [userRes, metricsRes] = await Promise.all([
      fetch(`${process.env.INTERNAL_API_URL}/v1/user/profile`, {
        headers: { 'Authorization': `Bearer ${process.env.INTERNAL_MICROSERVICE_KEY}` },
      }),
      fetch(`${process.env.INTERNAL_API_URL}/v1/analytics/metrics`, {
        headers: { 'Authorization': `Bearer ${process.env.INTERNAL_MICROSERVICE_KEY}` },
      }),
    ]);

    const userData = await userRes.json();
    const metricsData = await metricsRes.json();

    // Shape payload for the frontend
    res.status(200).json({
      username: userData.displayName,
      stats: { totalViews: metricsData.summary.views },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
```

[🚀back to top](#top)

### Next.js Pages Router BFF Route with Axios

Key Changes and Benefits of using Axios here:

- **Automatic JSON Parsing**: do not need to call .json() manually like you do with fetch. The result is immediately available on .data.
- **Built-in Timeouts**: Adding timeout: 5000 prevents your serverless function from hanging indefinitely if a microservice crashes.
- **axios.isAxiosError()**: This type-guard cleanly checks if the error came from the downstream API call, allowing you to pass the correct HTTP error code back to your UI.

```ts
// pages/api/dashboard.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Restrict the route to HTTP GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    // 2. Configure an Axios instance with base server settings
    const internalApi = axios.create({
      baseURL: process.env.INTERNAL_API_UR
      headers: {
        'Authorization': `Bearer ${process.env.INTERNAL_MICROSERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 5000, // 5-second timeout protection
    });

    // 3. Execute downstream microservice requests concurrently
    const [userResponse, metricsResponse] = await axios.all([
      internalApi.get('/v1/user/profile'),
      internalApi.get('/v1/analytics/metrics'),
    ]);

    // Axios automatically parses JSON payloads into the .data property
    const userData = userResponse.data;
    const metricsData = metricsResponse.data;

    // 4. BFF Data Transformation: Clean up and format payload for the client UI
    const bffPayload = {
      username: userData.displayName,
      avatar: userData.profileImage,
      stats: {
        totalViews: metricsData.summary.views,
        activeAlerts: metricsData.alerts.filter((a: any) => a.status === 'active').length,
      },
    };

    // 5. Send transformed response back to the client browser
    return res.status(200).json(bffPayload);

  } catch (error: any) {
    console.error('BFF Route Error:', error.message);

    // 6. Handle Axios-specific errors from downstream services
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json({
        error: 'Downstream service error',
        details: error.response.data,
      });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
```

[🚀back to top](#top)

## In Production env

- In production, a Next.js BFF route is simply a server-side endpoint deployed either as:
- Node.js route (next start, Docker, Kubernetes, Azure App Service), or a Serverless/Edge Function (Vercel, Azure Functions, AWS Lambda style deployments).

```
Browser
   |
   v
/api/users
   |
   v
Route Handler
   |
   v
Backend Service
```

### On Vercel

Each API route is deployed as:

- Serverless Function
- Edge Function (if configured)

```
Browser
   |
   v
https://app.com/api/users
   |
   v
Vercel Function
   |
   v
Internal Service / Database
   |
   v
Response
```

Every invocation:

- Function starts (cold start possible).
- Executes your route code.
- Returns response.
- Function may be torn down afterward.

### On Traditional Node Deployment

The API routes run inside the same Node process as your Next.js application

- When running: `next build`, `next start`
- or inside Docker:  `npm run build`, `npm run start`

```
Browser
   |
   v
Next.js Node Server
   |
   +--> Render Pages
   |
   +--> /api/* routes
   |
   v
Backend Services
```

### Authentication - he backend trusts the BFF instead of every browser request

```
Browser
   |
Cookie/JWT
   |
   v
BFF Route
   |
Validate User
   |
   v
Microservice
```

```ts
export default async function handler(req, res) {
  const session = await getServerSession(req, res);

  if (!session) {
    return res.status(401).end();
  }

  const data = await fetch(
    "http://user-service/profile"
  );

  res.json(await data.json());
}
```


### Database Access

- Many teams use BFF routes as the only layer touching the database
- Server-Side Network Access:
- Production BFF routes can access: because they execute on the server, not in the user's browser.  -
  - ✓ Databases
  - ✓ Redis
  - ✓ Internal APIs
  - ✓ Message Queues
  - ✓ Secret Stores
  - ✓ Private VPC Services


```
Browser
   |
   v
/api/orders
   |
   v
PostgreSQL
```

```ts
export default async function handler(req, res) {
  const orders = await prisma.order.findMany();
  res.json(orders);
}
```

[🚀back to top](#top)
