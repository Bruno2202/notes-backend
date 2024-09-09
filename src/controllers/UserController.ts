import { UserService } from "../services/UserService.js";
import { UserModel } from "../models/UserModel.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserDAL } from "../dal/UserDAL.js";
import { Params } from "../routes/userRoutes.js";

export class UserController {
    static async select(reply: FastifyReply) {
        try {
            const users: UserModel[] | null = await UserService.select();

            if (users) {
                reply.code(200).send(users);
            } else {
                reply.code(404).send({ error: "Users not found" });
            }
        } catch (error: any) {
            console.log(`Erro ao obter usuários: ${error.message}`);
            reply.status(500).send({ error: "Internal server error" });
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
                    reply.code(500).send({ error: "Internal server error" });
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
                    reply.code(500).send({ error: "Internal server error" });
                    break;
            }
        }
    }

    static async update(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
        try {
            const updatedUser: UserModel | null = await UserService.update(request.params.user);

            if (updatedUser) {
                reply.code(200).send(updatedUser);
            } else {
                reply.code(404).send({ error: "User not found" });
            }
        } catch (error) {
            reply.code(500).send({ error: "Internal server error" });
        }
    }

    static async validateFields(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
        try {
            const validUser = await UserService.validateFields(request.params.user);

            if (validUser) {
                reply.code(200).send(validUser);
            } else {
                reply.code(400).send({ error: "Invalid credentials" });
            }
        } catch (error: any) {
            switch (error.message) {
                case 'Email inválido':
                case 'Senha inválida': 
                case 'Usuário já existe':
                    reply.code(400).send({ error: error.message });
                    break;

                default:
                    console.log("Erro ao verificar usuário:", error.message);
                    reply.code(500).send({ error: "Internal server error" });
                    break;
            }
        }
    }

    static async registrer(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
        try {
            const newUser: UserModel | null = await UserService.registerUser(request.params.user);

            if (newUser) {
                reply.code(201).send({ message: "User created successfulyy", user: newUser });
            } else {
                reply.code(400).send({ error: "User could not be created" });
            }
        } catch (error: any) {
            switch (error.message) {
                case 'Email inválido':
                case 'Senha inválida':
                case 'Usuário já existe':
                    reply.code(400).send({ error: error.message });
                    break;

                default:
                    console.error(`Erro ao criar usuário: ${error.message}`)
                    reply.code(500).send({ error: "Internal server error. Please try again later" });
                    break;
            }
        }
    }

    static async delete(request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
        try {
            const userDeleted: boolean = await UserService.delete(request.params.id);

            if (userDeleted) {
                reply.code(204).send({ message: "User deleted successfuly" });
            }
        } catch (error: any) {
            switch (error.message) {
                case "ID inválido para busca":
                case "Não existe usuário com o ID informado":
                    reply.code(400).send({ error: error.message });
                    break;

                default:
                    console.error(`Erro ao deletar usuário: ${error.message}`)
                    reply.code(500).send({ error: "Internal server error" });
                    break;
            }
        }
    }
}