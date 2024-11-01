import { TokenController } from "../controllers/TokenController.js";
import TokenMiddleware from "../middleswares/TokenMiddleware.js";
export default async function tokenRoutes(fastify) {
    fastify.post('/token', { preHandler: TokenMiddleware.verifySecret }, async (request, reply) => {
        TokenController.validateToken(request, reply);
    });
    fastify.post('/token/generate', { preHandler: TokenMiddleware.verifySecret }, async (request, reply) => {
        TokenController.generateToken(request, reply);
    });
    fastify.post('/token/data', { preHandler: TokenMiddleware.verifySecret }, async (request, reply) => {
        TokenController.getTokenData(request, reply);
    });
}
