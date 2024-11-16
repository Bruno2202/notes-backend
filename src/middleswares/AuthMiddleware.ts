import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { TokenService } from "../services/TokenService.js";

export default class AuthMiddleware {
    static verifyAuth(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
        const { authorization } = request.headers

        const isAuthorized: boolean = TokenService.validateToken(authorization);
        if (isAuthorized) {
            done();
        } else {
            reply.code(400).send({ message: "Rota não autorizada: Usuário não autenticado" });
        }
    }
}
