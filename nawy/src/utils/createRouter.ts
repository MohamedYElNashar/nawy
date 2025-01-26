import { Router, json } from 'express';
import type { AnyZodObject } from 'zod';

// Define the structure of a route with generic types for flexibility
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Route<TBody = any, TQuery = any, TParams = any,TResponse = any> = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'; // HTTP methods
  path: string; // Route path
  body?: AnyZodObject; // Optional Zod schema for request body validation
  query?: AnyZodObject; // Optional Zod schema for query validation
  params?: AnyZodObject; // Optional Zod schema for params validation
  handler: (args: {
    body: TBody;
    query: TQuery;
    params: TParams;
  }) => Promise<TResponse>; // Handler function for processing requests
};

// Options for creating a router
type RouterOptions = {
  baseUrl: string; // Base URL for all routes in this router
  routes: Route[]; // List of routes to register
};

// Function to create a router
export function createRouter({ baseUrl, routes }: RouterOptions): Router {
  // Create an Express Router instance
  const router = Router();

  // Enable JSON parsing middleware for the router
  router.use(json());

  // Loop through each route and register it
  for (const route of routes) {
    const { method, path, body, query, params, handler } = route;

    // Register the route with the router
    router[method](path, async (req, res, next) => {
      try {
        // Validate the request body and query (if schemas are provided)
        const validatedBody = body ? body.parse(req.body) : undefined;
        const validatedQuery = query ? query.parse(req.query) : undefined;
        const validatedParams = params ? params.parse(req.params) : undefined;

        // Call the handler and pass the validated data
        const result = await handler({
          body: validatedBody,
          query: validatedQuery,
          params: validatedParams,
        });

        // Send the result as a JSON response
        res.status(200).json(result);
      } catch (error) {
        // Pass any errors to the next middleware (error handler)
        next(error);
      }
    });
  }

  // Attach the routes to the base URL and return the router
  return Router().use(baseUrl, router);
}
