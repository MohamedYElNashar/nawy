"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = createRouter;
const express_1 = require("express");
// Function to create a router
function createRouter({ baseUrl, routes }) {
    // Create an Express Router instance
    const router = (0, express_1.Router)();
    // Enable JSON parsing middleware for the router
    router.use((0, express_1.json)());
    // Loop through each route and register it
    for (const route of routes) {
        const { method, path, body, query, params, handler } = route;
        // Register the route with the router
        router[method](path, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate the request body and query (if schemas are provided)
                const validatedBody = body ? body.parse(req.body) : undefined;
                const validatedQuery = query ? query.parse(req.query) : undefined;
                const validatedParams = params ? params.parse(req.params) : undefined;
                // Call the handler and pass the validated data
                const result = yield handler({
                    body: validatedBody,
                    query: validatedQuery,
                    params: validatedParams,
                });
                // Send the result as a JSON response
                res.status(200).json(result);
            }
            catch (error) {
                // Pass any errors to the next middleware (error handler)
                next(error);
            }
        }));
    }
    // Attach the routes to the base URL and return the router
    return (0, express_1.Router)().use(baseUrl, router);
}
