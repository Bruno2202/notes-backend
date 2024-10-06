import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { MarkerController } from "../controllers/MarkerController.js";

export interface MarkerRequestBody {
    marker: {
        userId: number,
        description: string;
        id?: number;
    }
}

export interface MarkerRequestParams {
    userId: number,
    id: number;
}

export default async function markerRoutes(fastify: FastifyInstance) {
    fastify.get('/marker/:id', async (request: FastifyRequest<{ Params: MarkerRequestParams }>, reply: FastifyReply) => {
        await MarkerController.selectById(request, reply);
    });

    fastify.get('/marker/user/:userId', async (request: FastifyRequest<{ Params: MarkerRequestParams }>, reply: FastifyReply) => {
        await MarkerController.selectByUserId(request, reply);
    });

    fastify.post('/marker', async (request: FastifyRequest<{ Body: MarkerRequestBody }>, reply: FastifyReply) => {
        await MarkerController.create(request, reply);
    });

    fastify.put('/marker', async (request: FastifyRequest<{ Body: MarkerRequestBody }>, reply: FastifyReply) => {
        await MarkerController.update(request, reply);
    });

    fastify.delete('/marker/:id', async (request: FastifyRequest<{ Params: MarkerRequestParams }>, reply: FastifyReply) => {
        await MarkerController.delete(request, reply);
    });
}