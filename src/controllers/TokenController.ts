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

    static getTokenData(request: FastifyRequest<{ Body: TokenRequestBody }>, reply: FastifyReply) {
        try {
            const token: string | undefined = request.body.token;

            if (!token) {
                return reply.code(400).send({ data: null });
            }

            const isValid = TokenService.validateToken(token);

            if (isValid) {
                const data = TokenService.getTokenData(token);

                if (data) {
                    reply.code(200).send({ data: data });
                } else {
                    reply.code(400).send({ data: data });
                }
            } else {
                throw new Error("invalid token");
            }
        } catch (error: any) {
            switch (error.message) {
                case 'jwt expired':
                    reply.code(400).send({
                        error: 'Sessão expirada',
                        isValid: false
                    });
                    break;

                case 'invalid token':
                    reply.code(400).send({
                        error: 'Sessão inválida',
                        isValid: false
                    });
                    break;

                default:
                    console.error('Erro ao obter dados do token:', error.message);
                    reply.code(500).send({ error: 'Ocorreu um erro durante a validação da sessão' });
            }
        }
    }

    static validateToken(request: FastifyRequest<{ Body: TokenRequestBody }>, reply: FastifyReply) {
        try {
            const { token }: { token: string | undefined } = request.body;

            const isValid = TokenService.validateToken(token);

            if (isValid) {
                reply.code(200).send({
                    message: 'Sessão válida',
                    isValid: isValid
                });
            } else {
                reply.code(400).send({
                    error: 'Sessão expirada ou inválida',
                    isValid: isValid
                });
            }
        } catch (error: any) {
            switch (error.message) {
                case 'jwt expired':
                    reply.code(400).send({
                        error: 'Sessão expirada',
                        isValid: false
                    });
                    break;

                case 'invalid token':
                    reply.code(400).send({
                        error: 'Sessão inválida',
                        isValid: false
                    });
                    break;

                default:
                    console.error('Erro de validação do token:', error.message);
                    reply.code(500).send({ error: 'Ocorreu um erro durante a validação da sessão' });
            }
        }
    }
}
