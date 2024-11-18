"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_js_1 = require("../services/AuthService.js");
const UserModel_js_1 = require("../models/UserModel.js");
const TokenService_js_1 = require("../services/TokenService.js");
class AuthController {
    static async login(request, reply) {
        const { user: { email, password } } = request.body;
        try {
            const user = await AuthService_js_1.AuthService.validateLogin({ email, password });
            if (user) {
                const token = TokenService_js_1.TokenService.generateToken(user.getId, user.getEmail);
                reply.code(200).send({
                    success: true,
                    message: "Login realizado com sucesso!",
                    user,
                    token
                });
            }
            else {
                reply.code(400).send({
                    success: false,
                    message: "Usuário ou senha inválidos"
                });
            }
        }
        catch (error) {
            switch (error.message) {
                case 'É necessário informar um email e uma senha para logar':
                    reply.code(400).send({
                        success: false,
                        message: error.message
                    });
                    break;
                default:
                    console.log(`Erro ao realizar login: ${error.message}`);
                    reply.code(500).send({
                        success: false,
                        error: "Erro interno do servidor"
                    });
                    break;
            }
        }
    }
    static async register(request, reply) {
        const requestUser = new UserModel_js_1.UserModel(request.body.user.name, request.body.user.email, request.body.user.password, request.body.user.creationDate, request.body.user.id, request.body.user.pic);
        try {
            const newUser = await AuthService_js_1.AuthService.register(requestUser);
            if (newUser) {
                reply.code(201).send({
                    success: true,
                    message: "Usuário cadastrado com sucesso",
                    user: newUser
                });
            }
            else {
                reply.code(400).send({
                    success: false,
                    error: "Não foi possível cadastrar o usuário"
                });
            }
        }
        catch (error) {
            switch (error.message) {
                case 'Email inválido':
                case 'Senha inválida':
                case 'Usuário já existe':
                    reply.code(400).send({
                        success: false,
                        error: error.message
                    });
                    break;
                default:
                    console.error(`Erro ao cadastrar usuário: ${error.message}`);
                    reply.code(500).send({
                        success: false,
                        error: "Erro interno do servidor. Tente novamente mais tarde"
                    });
                    break;
            }
        }
    }
}
exports.AuthController = AuthController;
