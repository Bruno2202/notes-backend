import { UserService } from "../services/UserService.js";
import { UserModel } from "../models/UserModel.js";
export class UserController {
    static async select(reply) {
        try {
            const users = await UserService.select();
            if (users) {
                reply.code(200).send(users);
            }
            else {
                reply.code(404).send({ error: "Users not found" });
            }
        }
        catch (error) {
            console.log(`Erro ao obter usuários: ${error.message}`);
            reply.status(500).send({ error: "Internal server error" });
        }
    }
    static async selectById(request, reply) {
        try {
            const user = await UserService.selectById(request.params.id);
            if (user) {
                reply.code(200).send(user);
            }
            else {
                reply.code(404).send({ error: "User not found" });
            }
        }
        catch (error) {
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
    static async selectByEmail(request, reply) {
        try {
            const user = await UserService.selectByEmail(request.params.email);
            if (user) {
                reply.code(200).send(user);
            }
            else {
                reply.code(404).send({ error: "User not found" });
            }
        }
        catch (error) {
            switch (error.message) {
                case 'Email inválido':
                    reply.code(400).send({ error: error.message });
                    break;
                default:
                    console.log(`Erro ao buscar usuário pelo email: ${error}`);
                    reply.code(500).send({ error: "Internal server error" });
                    break;
            }
        }
    }
    static async update(request, reply) {
        const requestUser = new UserModel(request.body.user.name, request.body.user.email, request.body.user.password, request.body.user.id, request.body.user.userPic);
        try {
            const updatedUser = await UserService.update(requestUser);
            if (updatedUser) {
                reply.code(200).send(updatedUser);
            }
            else {
                reply.code(404).send({ error: "User not found" });
            }
        }
        catch (error) {
            reply.code(500).send({ error: "Internal server error" });
        }
    }
    static async validateFields(request, reply) {
        const requestUser = new UserModel(request.body.user.name, request.body.user.email, request.body.user.password, request.body.user.id, request.body.user.userPic);
        try {
            const isValid = await UserService.validateFields(requestUser);
            if (isValid) {
                reply.code(200).send({
                    message: "Credenciais válidas",
                    isValid: isValid
                });
            }
            else {
                reply.code(400).send({
                    error: "Credenciais inválidas",
                    isValid: isValid
                });
            }
        }
        catch (error) {
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
                        error: "Internal server error",
                        isValid: false
                    });
                    break;
            }
        }
    }
    static async registrer(request, reply) {
        const requestUser = new UserModel(request.body.user.name, request.body.user.email, request.body.user.password, request.body.user.id, request.body.user.userPic);
        try {
            const newUser = await UserService.registerUser(requestUser);
            if (newUser) {
                reply.code(201).send({ message: "User created successfulyy", user: newUser });
            }
            else {
                reply.code(400).send({ error: "User could not be created" });
            }
        }
        catch (error) {
            switch (error.message) {
                case 'Email inválido':
                case 'Senha inválida':
                case 'Usuário já existe':
                    reply.code(400).send({ error: error.message });
                    break;
                default:
                    console.error(`Erro ao criar usuário: ${error.message}`);
                    reply.code(500).send({ error: "Internal server error. Please try again later" });
                    break;
            }
        }
    }
    static async delete(request, reply) {
        try {
            const userDeleted = await UserService.delete(request.params.id);
            if (userDeleted) {
                reply.code(200).send({ message: "User deleted successfuly" });
            }
        }
        catch (error) {
            switch (error.message) {
                case "ID inválido para busca":
                case "Não existe usuário com o ID informado":
                    reply.code(400).send({ error: error.message });
                    break;
                default:
                    console.error(`Erro ao deletar usuário: ${error.message}`);
                    reply.code(500).send({ error: "Internal server error" });
                    break;
            }
        }
    }
}
