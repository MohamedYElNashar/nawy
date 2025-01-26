import { Router, json } from 'express';
import type { AnyZodObject } from 'zod';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Route<TBody = any, TQuery = any, TParams = any,TResponse = any> = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'; 
  path: string; 
  body?: AnyZodObject; 
  query?: AnyZodObject; 
  params?: AnyZodObject; 
  handler: (args: {
    body: TBody;
    query: TQuery;
    params: TParams;
  }) => Promise<TResponse>; 
};

type RouterOptions = {
  baseUrl: string; // Base URL for all routes in this router
  routes: Route[]; // List of routes to register
};

export function createRouter({ baseUrl, routes }: RouterOptions): Router {
  const router = Router();

  // Enable JSON parsing middleware for the router
  router.use(json());

  for (const route of routes) {
    const { method, path, body, query, params, handler } = route;

    router[method](path, async (req, res, next) => {
      try {
        const validatedBody = body ? body.parse(req.body) : undefined;
        const validatedQuery = query ? query.parse(req.query) : undefined;
        const validatedParams = params ? params.parse(req.params) : undefined;

        // Call the handler and pass the validated data
        const result = await handler({
          body: validatedBody,
          query: validatedQuery,
          params: validatedParams,
        });

        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    });
  }

  // Attach the routes to the base URL and return the router
  return Router().use(baseUrl, router);
}
