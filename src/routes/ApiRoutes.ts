import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function ApiRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/',
        async (request: FastifyRequest, reply: FastifyReply) => {
            reply.code(200).send({
                title: 'Bem vindo à API do Notes!',
                content: 'Todas as requisições só podem ser feitas através do aplicativo'
            })
        }
    )
}