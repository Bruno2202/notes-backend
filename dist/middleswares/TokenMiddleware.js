import { TokenService } from "../services/TokenService.js";
export default class TokenMiddleware {
    static verifySecret(request, reply, done) {
        const { authorization } = request.headers;
        const isAuthorized = TokenService.compareSecret(authorization);
        if (isAuthorized) {
            console.log("✅ Rota autorizada: Usuário autenticado");
            done();
        }
        else {
            console.log("❌ Rota não autorizada: Usuário não autenticado");
            reply.code(400).send({ message: "Rota não autorizada: Usuário não autenticado" });
        }
    }
}
