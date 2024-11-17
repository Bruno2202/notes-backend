import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { TokenService } from "../services/TokenService.js";

export default class TokenMiddleware {
    static verifySecret(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        const { authorization } = request.headers

        const isAuthorized: boolean = TokenService.compareSecret(authorization!);
        if (isAuthorized) {
            done();
        } else {
            reply.code(400).send({ message: "Rota não autorizada: Requisição fora da aplicação" });
        }
    }
}

