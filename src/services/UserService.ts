import { UserDAL } from "../dal/UserDAL.js";
import { UserModel } from "../models/UserModel.js";

export class UserService {
    static async selectById(id: number): Promise<UserModel | null> {
        if (!UserService.isvalidId(id)) {
            throw new Error('ID inválido para busca');
        }

        try {
            const userData = await UserDAL.selectById(id);
            if (userData) {
                return userData;
            }
            return null;
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

    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    }

    static isValidPassword(password: string): boolean {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

        return passwordRegex.test(password);
    }

    static isvalidId(id: number): boolean {
        if (id <= 0) {
            return false;
        }

        return true;
    }

    static async existingUser(email: string): Promise<boolean> {
        const user = await UserDAL.selectByEmail(email);

        return !!user;
    }

    static async validateFields(user: UserModel): Promise<boolean> {
        if (!UserService.isValidEmail(user.getEmail)) {
            throw new Error('Email inválido');
        }

        if (!UserService.isValidPassword(user.getPassword)) {
            throw new Error('Senha inválida');
        }

        if (await UserService.existingUser(user.getEmail)) {
            throw new Error('Usuário já existe');
        }

        return true;
    }

    static async registerUser(user: UserModel): Promise<UserModel | null> {
        try {
            await UserService.validateFields(user);

            const newUser = await UserDAL.create(user);

            return newUser;
        } catch (error) {
            return null;
        }
    }

    static async update(user: UserModel): Promise<UserModel | null> {
        try {
            const updatedUser: UserModel | null = await UserDAL.update(user);

            return updatedUser;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async delete(id: number): Promise<boolean> {
        try {
            const user = await UserService.selectById(id);

            if (user === null) {
                throw new Error('Não existe usuário com o ID informado');
            }

            // const deletedUser: boolean = await UserDAL.delete(id);

            // return deletedUser;
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}