import { MarkerController } from "../controllers/MarkerController.js";
import AuthMiddleware from "../middleswares/AuthMiddleware.js";
export default async function markerRoutes(fastify) {
    fastify.get('/marker/:id', { preHandler: AuthMiddleware.verifyAuth }, async (request, reply) => {
        await MarkerController.selectById(request, reply);
    });
    fastify.get('/marker/note/:noteId', { preHandler: AuthMiddleware.verifyAuth }, async (request, reply) => {
        await MarkerController.selectByNoteId(request, reply);
    });
    fastify.get('/marker/user/:userId', async (request, reply) => {
        await MarkerController.selectByUserId(request, reply);
    });
    fastify.post('/marker', { preHandler: AuthMiddleware.verifyAuth }, async (request, reply) => {
        await MarkerController.create(request, reply);
    });
    fastify.put('/marker', { preHandler: AuthMiddleware.verifyAuth }, async (request, reply) => {
        await MarkerController.update(request, reply);
    });
    fastify.delete('/marker/:id', { preHandler: AuthMiddleware.verifyAuth }, async (request, reply) => {
        await MarkerController.delete(request, reply);
    });
}
