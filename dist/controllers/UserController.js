"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_js_1 = require("../services/UserService.js");
const UserModel_js_1 = require("../models/UserModel.js");
class UserController {
    static async select(reply) {
        try {
            const users = await UserService_js_1.UserService.select();
            if (users) {
                reply.code(200).send(users);
            }
            else {
                reply.code(404).send({ error: "Usuários não encontrados" });
            }
        }
        catch (error) {
            console.log(`Erro ao obter usuários: ${error.message}`);
            reply.status(500).send({ error: "Erro interno do servidor" });
        }
    }
    static async selectById(request, reply) {
        try {
            const user = await UserService_js_1.UserService.selectById(request.params.id);
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
                    reply.code(500).send({ error: "Erro interno do servidor" });
                    break;
            }
        }
    }
    static async selectByEmail(request, reply) {
        try {
            const user = await UserService_js_1.UserService.selectByEmail(request.params.email);
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
                    reply.code(500).send({ error: "Erro interno do servidor" });
                    break;
            }
        }
    }
    static async update(request, reply) {
        const requestUser = new UserModel_js_1.UserModel(request.body.user.name, request.body.user.email, request.body.user.password, request.body.user.creationDate, request.body.user.id, request.body.user.userPic);
        try {
            const updatedUser = await UserService_js_1.UserService.update(requestUser);
            if (updatedUser) {
                reply.code(200).send(updatedUser);
            }
            else {
                reply.code(404).send({ error: "Usuário não encontrado" });
            }
        }
        catch (error) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }
    static async validateFields(request, reply) {
        const requestUser = new UserModel_js_1.UserModel(request.body.user.name, request.body.user.email, request.body.user.password, request.body.user.creationDate, request.body.user.id, request.body.user.userPic);
        try {
            const isValid = await UserService_js_1.UserService.validateFields(requestUser);
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
                        error: "Erro interno do servidor",
                        isValid: false
                    });
                    break;
            }
        }
    }
    static async delete(request, reply) {
        try {
            const userDeleted = await UserService_js_1.UserService.delete(request.params.id);
            if (userDeleted) {
                reply.code(200).send({ message: "Usuário deletado com sucesso" });
            }
            else {
                reply.code(200).send({ message: "Não foi possível deletar o usuário" });
            }
        }
        catch (error) {
            switch (error.message) {
                case "ID inválido para deleção":
                case "Não existe usuário com o ID informado":
                    reply.code(400).send({ error: error.message });
                    break;
                default:
                    console.error(`Erro ao deletar usuário: ${error.message}`);
                    reply.code(500).send({ error: "Erro interno do servidor" });
                    break;
            }
        }
    }
}
exports.UserController = UserController;
