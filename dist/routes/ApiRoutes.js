"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApiRoutes;
async function ApiRoutes(fastify) {
    fastify.get('/', async (request, reply) => {
        reply.code(200).send({
            title: 'Bem vindo à API do Notes!',
            content: 'Todas as requisições só podem ser feitas através do aplicativo'
        });
    });
}
