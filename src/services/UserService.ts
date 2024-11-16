import { validate } from "uuid";
import { UserDAL } from "../dal/UserDAL.js";
import { UserModel } from "../models/UserModel.js";
import { ImageService } from "./ImageService.js";
import { error } from "console";

export class UserService {
    static async select(): Promise<UserModel[]> {
        try {
            return await UserDAL.select();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async selectById(id: string): Promise<UserModel | null> {
        if (!validate(id)) {
            throw new Error('ID inválido para busca');
        }

        try {
            return await UserDAL.selectById(id);
        } catch (error: any) {
            throw error;
        }
    }

    static async selectByEmail(email: string): Promise<UserModel | null> {
        if (!UserService.isValidEmail(email)) {
            throw new Error('Email inválido');
        }

        try {
            const userData = await UserDAL.selectByEmail(email);
            if (userData) {
                return userData;
            }
            return null;
        } catch (error: any) {
            throw error;
        }
    }

    static async update(user: UserModel): Promise<UserModel | null> {
        let userPicURL: string | null = null;

        if (user.getId && user.getUserPic != null) {
            const currentUserData = await this.selectById(user.getId);
            const currentUserPic: string = String(currentUserData?.getUserPic);

            if (user.getUserPic != currentUserPic && typeof (user.getUserPic) === "string") {
                const blob = ImageService.base64ToBlob(user.getUserPic);
                userPicURL = await ImageService.uploadImage(blob, user.getId);
            } else {
                userPicURL = currentUserPic;
            }

            user.setUserPic = userPicURL;
        }

        try {
            const updatedUser: UserModel | null = await UserDAL.update(user);

            return updatedUser;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async delete(id: string): Promise<boolean> {
        if (!validate(id)) {
            throw new Error("ID inválido para deleção");
        }

        if (await UserService.selectById(id) === null) {
            throw new Error('Não existe usuário com o ID informado');
        }

        try {
            return await UserDAL.delete(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async validateFields(user: UserModel): Promise<boolean> {
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

    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    }

    static isValidPassword(password: string): boolean {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

        return passwordRegex.test(password);
    }

    static async existingUser(email: string): Promise<boolean> {
        const user = await UserDAL.selectByEmail(email);

        return !!user;
    }
}