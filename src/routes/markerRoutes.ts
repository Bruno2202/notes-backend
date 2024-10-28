import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { MarkerController } from "../controllers/MarkerController.js";
import AuthMiddleware from "../middleswares/AuthMiddleware.js";

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
    noteId: number;
}

export default async function markerRoutes(fastify: FastifyInstance) {
    fastify.get<{ Params: MarkerRequestParams }>(
        '/marker/:id',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Params: MarkerRequestParams }>, reply: FastifyReply) => {
            await MarkerController.selectById(request, reply);
        }
    );

    fastify.get<{ Params: MarkerRequestParams }>(
        '/marker/note/:noteId',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Params: MarkerRequestParams }>, reply: FastifyReply) => {
            await MarkerController.selectByNoteId(request, reply);
        }
    );

    fastify.get<{ Params: MarkerRequestParams }>(
        '/marker/user/:userId',
        async (request: FastifyRequest<{ Params: MarkerRequestParams }>, reply: FastifyReply) => {
            await MarkerController.selectByUserId(request, reply);
        }
    );

    fastify.post<{ Body: MarkerRequestBody }>(
        '/marker',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Body: MarkerRequestBody }>, reply: FastifyReply) => {
            await MarkerController.create(request, reply);
        }
    );

    fastify.put<{ Body: MarkerRequestBody }>(
        '/marker',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Body: MarkerRequestBody }>, reply: FastifyReply) => {
            await MarkerController.update(request, reply);
        }
    );

    fastify.delete<{ Params: MarkerRequestParams }>(
        '/marker/:id',
        { preHandler: AuthMiddleware.verifyAuth },
        async (request: FastifyRequest<{ Params: MarkerRequestParams }>, reply: FastifyReply) => {
            await MarkerController.delete(request, reply);
        }
    );
}