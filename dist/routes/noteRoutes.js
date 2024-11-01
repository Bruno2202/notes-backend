import { NoteController } from "../controllers/NoteControllers.js";
import AuthMiddleware from "../middleswares/AuthMiddleware.js";
export default async function noteRoutes(fastify) {
    fastify.get('/notes', { preHandler: AuthMiddleware.verifyAuth }, async (request, reply) => {
        await NoteController.select(reply);
    });
    fastify.get('/notes/:id', { preHandler: AuthMiddleware.verifyAuth }, async (request, reply) => {
        await NoteController.selectById(request, reply);
    });
    fastify.get('/notes/user/:userId', { preHandler: AuthMiddleware.verifyAuth }, async (request, reply) => {
        await NoteController.selectByUserId(request, reply);
    });
    fastify.post('/notes', { preHandler: AuthMiddleware.verifyAuth }, async (request, reply) => {
        await NoteController.create(request, reply);
    });
    fastify.put('/notes', { preHandler: AuthMiddleware.verifyAuth }, async (request, reply) => {
        await NoteController.update(request, reply);
    });
    fastify.delete('/notes/:id', { preHandler: AuthMiddleware.verifyAuth }, async (request, reply) => {
        await NoteController.delete(request, reply);
    });
}
