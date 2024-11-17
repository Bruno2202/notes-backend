"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenService_js_1 = require("../services/TokenService.js");
class TokenMiddleware {
    static verifySecret(request, reply, done) {
        const { authorization } = request.headers;
        const isAuthorized = TokenService_js_1.TokenService.compareSecret(authorization);
        if (isAuthorized) {
            done();
        }
        else {
            reply.code(400).send({ message: "Rota não autorizada: Requisição fora da aplicação" });
        }
    }
}
exports.default = TokenMiddleware;
