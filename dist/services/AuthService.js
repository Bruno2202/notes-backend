"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const UserDAL_js_1 = require("../dal/UserDAL.js");
const UserModel_js_1 = require("../models/UserModel.js");
const UserService_js_1 = require("./UserService.js");
const bcrypt = require('bcrypt');
class AuthService {
    static async validateLogin(user) {
        if (!user.email || !user.password) {
            throw new Error("É necessário informar um email e uma senha para logar");
        }
        try {
            if (!UserService_js_1.UserService.isValidEmail(user.email)) {
                return null;
            }
            const userFetched = await UserDAL_js_1.UserDAL.selectByEmail(user.email);
            if (userFetched) {
                const isMatch = await this.comparePassword(user.password, userFetched.getPassword);
                if (isMatch) {
                    return userFetched;
                }
            }
            return null;
        }
        catch (error) {
            console.error('Erro ao validar o login:', error.message);
            throw new Error(error.message);
        }
    }
    static async register(user) {
        try {
            await UserService_js_1.UserService.validateFields(user);
            const userToCreate = new UserModel_js_1.UserModel(user.getName, user.getEmail, user.getPassword, user.getCreationDate);
            userToCreate.setPassword = await this.hashPassword(user.getPassword);
            const newUser = await UserDAL_js_1.UserDAL.create(userToCreate);
            if (user.getUserPic && newUser) {
                return await UserService_js_1.UserService.update(new UserModel_js_1.UserModel(newUser.getName, newUser.getEmail, newUser.getPassword, newUser.getCreationDate, newUser.getId, user.getUserPic));
            }
            else if (newUser) {
                return newUser;
            }
            return null;
        }
        catch (error) {
            console.log(`Erro ao criar usuário: ${error.message}`);
            throw new Error("Não foi possível criar usuário. Tente novamente mais tarde");
        }
    }
    static async hashPassword(password) {
        try {
            return await bcrypt.hash(password, 10);
        }
        catch (error) {
            console.log(`Erro ao gerar hash da senha: ${error.message}`);
            throw new Error('Erro ao gerar hash da senha');
        }
    }
    static async comparePassword(password, hashedPassword) {
        try {
            return await bcrypt.compare(password, hashedPassword);
        }
        catch (error) {
            console.log(`Erro ao comparar senhas: ${error.message}`);
            throw new Error('Erro ao comparar senhas');
        }
    }
}
exports.AuthService = AuthService;
