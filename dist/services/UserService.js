import { UserDAL } from "../dal/UserDAL.js";
import { UserModel } from "../models/UserModel.js";
import { ImageService } from "./ImageService.js";
export class UserService {
    static async select() {
        try {
            const users = await UserDAL.select();
            if (users) {
                return users;
            }
            return null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async selectById(id) {
        if (!UserService.isvalidId(id)) {
            throw new Error('ID inválido para busca');
        }
        try {
            const userData = await UserDAL.selectById(id);
            if (userData) {
                const userSelected = new UserModel(userData.getName, userData.getEmail, userData.getPassword, userData.getId, userData.getUserPic);
                return userSelected;
            }
            return null;
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
            const userData = await UserDAL.selectByEmail(email);
            if (userData) {
                return userData;
            }
            return null;
        }
        catch (error) {
            throw error;
        }
    }
    static async registerUser(user) {
        try {
            await UserService.validateFields(user);
            const userToCreate = new UserModel(user.getName, user.getEmail, user.getPassword);
            const newUser = await UserDAL.create(userToCreate);
            if (user.getUserPic && newUser) {
                return await UserService.update(new UserModel(newUser.getName, newUser.getEmail, newUser.getPassword, newUser.getId, user.getUserPic));
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
    static async update(user) {
        let userPicURL = null;
        if (user.getId && user.getUserPic != null) {
            const currentUserData = await this.selectById(user.getId);
            const currentUserPic = String(currentUserData?.getUserPic);
            if (user.getUserPic != currentUserPic && typeof (user.getUserPic) === "string") {
                const blob = ImageService.base64ToBlob(user.getUserPic);
                userPicURL = await ImageService.uploadImage(blob, user.getId);
            }
            else {
                userPicURL = currentUserPic;
            }
            user.setUserPic = userPicURL;
        }
        try {
            const updatedUser = await UserDAL.update(user);
            return updatedUser;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async delete(id) {
        try {
            const user = await UserService.selectById(id);
            if (user === null) {
                throw new Error('Não existe usuário com o ID informado');
            }
            const deletedUser = await UserDAL.delete(id);
            return deletedUser;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static isValidPassword(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        return passwordRegex.test(password);
    }
    static isvalidId(id) {
        if (id <= 0) {
            return false;
        }
        return true;
    }
    static async existingUser(email) {
        const user = await UserDAL.selectByEmail(email);
        return !!user;
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
}
