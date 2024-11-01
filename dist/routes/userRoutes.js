import { UserController } from "../controllers/UserController.js";
export default async function userRoutes(fastify) {
    fastify.get('/usuarios', async (request, reply) => {
        await UserController.select(reply);
    });
    fastify.get('/usuarios/id/:id', async (request, reply) => {
        await UserController.selectById(request, reply);
    });
    fastify.get('/usuarios/email/:email', async (request, reply) => {
        await UserController.selectByEmail(request, reply);
    });
    fastify.post('/usuarios', async (request, reply) => {
        await UserController.registrer(request, reply);
    });
    fastify.post('/usuarios/validar', async (request, reply) => {
        await UserController.validateFields(request, reply);
    });
    fastify.put('/usuarios', async (request, reply) => {
        await UserController.update(request, reply);
    });
    fastify.delete('/usuarios/:id', async (request, reply) => {
        await UserController.delete(request, reply);
    });
}
