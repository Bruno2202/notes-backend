"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tokenRoutes;
const TokenController_js_1 = require("../controllers/TokenController.js");
async function tokenRoutes(fastify) {
    fastify.post('/token', 
    // { preHandler: TokenMiddleware.verifySecret },
    async (request, reply) => {
        TokenController_js_1.TokenController.validateToken(request, reply);
    });
    fastify.post('/token/generate', 
    // { preHandler: TokenMiddleware.verifySecret },
    async (request, reply) => {
        TokenController_js_1.TokenController.generateToken(request, reply);
    });
    fastify.post('/token/data', 
    // { preHandler: TokenMiddleware.verifySecret },
    async (request, reply) => {
        TokenController_js_1.TokenController.getTokenData(request, reply);
    });
}
