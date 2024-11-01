import { NotesMarkersController } from "../controllers/NotesMarkersController.js";
export default async function notesMarkersRoutes(fastify) {
    fastify.post('/notesMarkers', async (request, reply) => {
        await NotesMarkersController.create(request, reply);
    });
    fastify.delete('/notesMarkers', async (request, reply) => {
        await NotesMarkersController.delete(request, reply);
    });
}
