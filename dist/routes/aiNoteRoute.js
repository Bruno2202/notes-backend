import { AiNoteController } from "../controllers/AiNoteController.js";
import AuthMiddleware from "../middleswares/AuthMiddleware.js";
export default async function aiNoteRoute(fastify) {
    fastify.post('/aiNote', { preHandler: AuthMiddleware.verifyAuth }, async (request, reply) => {
        await AiNoteController.prompt(request, reply);
    });
}
