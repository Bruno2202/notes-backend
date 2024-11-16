"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const uuid_1 = require("uuid");
const UserDAL_js_1 = require("../dal/UserDAL.js");
const ImageService_js_1 = require("./ImageService.js");
class UserService {
    static async select() {
        try {
            return await UserDAL_js_1.UserDAL.select();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async selectById(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new Error('ID inválido para busca');
        }
        try {
            return await UserDAL_js_1.UserDAL.selectById(id);
        }
        catch (error) {
            throw error;
        }
    }
    static async selectByEmail(email) {
        if (!UserService.isValidEmail(email)) {
            throw new Error('Email inválido');
        }
        try {
            const userData = await UserDAL_js_1.UserDAL.selectByEmail(email);
            if (userData) {
                return userData;
            }
            return null;
        }
        catch (error) {
            throw error;
        }
    }
    static async update(user) {
        let userPicURL = null;
        if (user.getId && user.getUserPic != null) {
            const currentUserData = await this.selectById(user.getId);
            const currentUserPic = String(currentUserData?.getUserPic);
            if (user.getUserPic != currentUserPic && typeof (user.getUserPic) === "string") {
                const blob = ImageService_js_1.ImageService.base64ToBlob(user.getUserPic);
                userPicURL = await ImageService_js_1.ImageService.uploadImage(blob, user.getId);
            }
            else {
                userPicURL = currentUserPic;
            }
            user.setUserPic = userPicURL;
        }
        try {
            const updatedUser = await UserDAL_js_1.UserDAL.update(user);
            return updatedUser;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async delete(id) {
        if (!(0, uuid_1.validate)(id)) {
            throw new Error("ID inválido para deleção");
        }
        if (await UserService.selectById(id) === null) {
            throw new Error('Não existe usuário com o ID informado');
        }
        try {
            return await UserDAL_js_1.UserDAL.delete(id);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async validateFields(user) {
        if (!UserService.isValidEmail(user.getEmail)) {
            throw new Error('Email inválido');
        }
        if (!UserService.isValidPassword(user.getPassword)) {
            throw new Error('Senha inválida');
        }
        if (await UserService.existingUser(user.getEmail)) {
            throw new Error('Email já utilizado');
        }
        return true;
    }
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static isValidPassword(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        return passwordRegex.test(password);
    }
    static async existingUser(email) {
        const user = await UserDAL_js_1.UserDAL.selectByEmail(email);
        return !!user;
    }
}
exports.UserService = UserService;
