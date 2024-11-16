import { UserService } from "../services/UserService.js";
import { UserModel } from "../models/UserModel.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { Params, UserRequestBody } from "../routes/userRoutes.js";

export class UserController {
    static async select(reply: FastifyReply) {
        try {
            const users: UserModel[] = await UserService.select();

            if (users) {
                reply.code(200).send(users);
            } else {
                reply.code(404).send({ error: "Usuários não encontrados" });
            }
        } catch (error: any) {
            console.log(`Erro ao obter usuários: ${error.message}`);
            reply.status(500).send({ error: "Erro interno do servidor" });
        }
    }

    static async selectById(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
        try {
            const user: UserModel | null = await UserService.selectById(request.params.id);

            if (user) {
                reply.code(200).send(user);
            } else {
                reply.code(404).send({ error: "User not found" });
            }
        } catch (error: any) {
            switch (error.message) {
                case 'ID inválido para busca':
                    reply.code(400).send({ error: error.message });
                    break;

                default:
                    console.log("Erro ao buscar usuário pelo id:", error);
                    reply.code(500).send({ error: "Erro interno do servidor" });
                    break;
            }
        }
    }

    static async selectByEmail(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
        try {
            const user: UserModel | null = await UserService.selectByEmail(request.params.email);

            if (user) {
                reply.code(200).send(user);
            } else {
                reply.code(404).send({ error: "User not found" });
            }
        } catch (error: any) {
            switch (error.message) {
                case 'Email inválido':
                    reply.code(400).send({ error: error.message });
                    break;

                default:
                    console.log(`Erro ao buscar usuário pelo email: ${error}`)
                    reply.code(500).send({ error: "Erro interno do servidor" });
                    break;
            }
        }
    }

    static async update(request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply) {
        const requestUser = new UserModel(
            request.body.user.name,
            request.body.user.email,
            request.body.user.password,
            request.body.user.creationDate,
            request.body.user.id,
            request.body.user.userPic
        );


        try {
            const updatedUser: UserModel | null = await UserService.update(requestUser);

            if (updatedUser) {
                reply.code(200).send(updatedUser);
            } else {
                reply.code(404).send({ error: "Usuário não encontrado" });
            }
        } catch (error) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }

    static async validateFields(request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply) {
        const requestUser = new UserModel(
            request.body.user.name,
            request.body.user.email,
            request.body.user.password,
            request.body.user.creationDate,
            request.body.user.id,
            request.body.user.userPic
        );

        try {
            const isValid = await UserService.validateFields(requestUser);

            if (isValid) {
                reply.code(200).send({
                    message: "Credenciais válidas",
                    isValid: isValid
                });
            } else {
                reply.code(400).send({ 
                    error: "Credenciais inválidas",
                    isValid: isValid
                });
            }
        } catch (error: any) {
            switch (error.message) {
                case 'Email inválido':
                case 'Senha inválida': 
                case 'Email já utilizado':
                    reply.code(400).send({ 
                        error: error.message,
                        isValid: false
                    });
                    break;

                default:
                    console.log("Erro ao verificar usuário:", error.message);
                    reply.code(500).send({ 
                        error: "Erro interno do servidor",
                        isValid: false
                    });
                    break;
            }
        }
    }

    static async delete(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
        try {
            const userDeleted: boolean = await UserService.delete(request.params.id);

            if (userDeleted) {
                reply.code(200).send({ message: "Usuário deletado com sucesso" });
            } else {
                reply.code(200).send({ message: "Não foi possível deletar o usuário" });
            }
        } catch (error: any) {
            switch (error.message) {
                case "ID inválido para deleção":
                case "Não existe usuário com o ID informado":
                    reply.code(400).send({ error: error.message });
                    break;

                default:
                    console.error(`Erro ao deletar usuário: ${error.message}`)
                    reply.code(500).send({ error: "Erro interno do servidor" });
                    break;
            }
        }
    }
}