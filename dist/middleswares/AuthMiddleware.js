import { TokenService } from "../services/TokenService.js";
export default class AuthMiddleware {
    static verifyAuth(request, reply, done) {
        const { authorization } = request.headers;
        const isAuthorized = TokenService.validateToken(authorization);
        if (isAuthorized) {
            // console.log("✅ Rota autorizada: Usuário autenticado");
            done();
        }
        else {
            // console.log("❌ Rota não autorizada: Usuário não autenticado");
            reply.code(400).send({ message: "Rota não autorizada: Usuário não autenticado" });
        }
    }
}
