import { FastifyReply, FastifyRequest } from "fastify";
import { TokenService } from "../services/TokenService.js";
import { TokenRequestBody } from "../routes/tokenRoutes.js";

export class TokenController {
    static async generateToken(request: FastifyRequest<{ Body: TokenRequestBody }>, reply: FastifyReply) {
        try {
            const { user: { id, email } } = request.body;
    
            if (!id || !email) {
                reply.code(400).send({ error: "ID e Email são necessários para gerar o token" });
            }
    
            const token = TokenService.generateToken({ id, email });
    
            if (token) {
                reply.code(201).send({ token: token });
            } else {
                reply.code(400).send({ error: "Não foi possível gerar o token" });
            }
        } catch (error: any) {
            console.error('Erro na criação do token:', error.message);
            reply.code(500).send({ error: 'Erro interno durante a criação do token' });
        }
    }

    static async validateToken(request: FastifyRequest<{ Body: TokenRequestBody }>, reply: FastifyReply) {
        try {
            const { token }: { token: string | undefined } = request.body;

            const isValid = TokenService.validateToken(token);

            if (isValid) {
                reply.code(200).send({
                    message: 'Valid token',
                    isValid: isValid
                });
            } else {
                reply.code(400).send({
                    error: 'Invalid or expired token',
                    isValid: isValid
                });
            }
        } catch (error: any) {
            switch (error.message) {
                case 'jwt expired':
                    reply.code(400).send({
                        error: 'Token expirado',
                        isValid: false
                    });
                    break;

                case 'invalid token':
                    reply.code(400).send({
                        error: 'Token inválido',
                        isValid: false
                    });
                    break;

                default:
                    console.error('Erro de validação do token:', error.message);
                    reply.code(500).send({ error: 'An error occurred during token validation' });
            }
        }
    }
}
