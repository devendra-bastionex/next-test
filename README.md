# Next.js Custom Server

This project demonstrates how to use a custom server with Next.js.

## Features

- Custom Express server integration with Next.js
- Custom API routes
- Middleware support
- Environment variable configuration

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Create a `.env.local` file based on `.env.example` and configure your environment variables.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

For production:

```bash
npm run build
npm run start
# or on Windows
npm run start:windows
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Custom Server Benefits

- Full control over server behavior
- Custom middleware
- Custom routing
- Server-side processing before rendering
- Integration with other server-side systems

## API Routes

The following custom API routes are available:

- `/api/hello` - Returns a simple greeting message
- `/api/user/:id` - Returns user data for the specified ID

## Learn More

To learn more about Next.js and custom servers, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Custom Server and Routing](https://nextjs.org/docs/advanced-features/custom-server)