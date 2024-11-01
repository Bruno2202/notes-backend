import { AuthController } from "../controllers/AuthController.js";
export default async function authRoutes(fastify) {
    fastify.post('/login', async (request, reply) => {
        await AuthController.login(request, reply);
    });
}
