import { createHash } from "crypto";
import { UserDAL } from "../dal/UserDAL.js";
import { UserModel } from "../models/UserModel.js";
import { UserService } from "./UserService.js";

const bcrypt = require('bcrypt');

export class AuthService {
    static async validateLogin(user: { email: string, password: string }): Promise<UserModel | null> {
        if (!user.email || !user.password) {
            throw new Error("É necessário informar um email e uma senha para logar");
        }

        try {
            if (!UserService.isValidEmail(user.email)) {
                return null;
            }

            const userFetched: UserModel | null = await UserDAL.selectByEmail(user.email);

            if (userFetched) {
                const isMatch: boolean = await this.comparePassword(user.password, userFetched.getPassword);

                if (isMatch) {
                    return userFetched;
                }
            }

            return null;
        } catch (error: any) {
            console.error('Erro ao validar o login:', error.message);
            throw new Error(error.message);
        }
    }

    static async register(user: UserModel): Promise<UserModel | null> {
        try {
            await UserService.validateFields(user);

            const userToCreate = new UserModel(
                user.getName,
                user.getEmail,
                user.getPassword,
                user.getCreationDate
            );

            userToCreate.setPassword = await this.hashPassword(user.getPassword);

            const newUser = await UserDAL.create(userToCreate);

            if (user.getUserPic && newUser) {
                return await UserService.update(
                    new UserModel(
                        newUser.getName,
                        newUser.getEmail,
                        newUser.getPassword,
                        newUser.getCreationDate,
                        newUser.getId,
                        user.getUserPic
                    )
                );
            } else if (newUser) {
                return newUser;
            }

            return null;
        } catch (error: any) {
            throw new Error(error)
        }
    }

    static async hashPassword(password: string) {
        try {
            return await bcrypt.hash(password, 10);
        } catch (error: any) {
            console.log(`Erro ao gerar hash da senha: ${error.message}`)
            throw new Error('Erro ao gerar hash da senha');
        }
    }

    static async comparePassword(password: string, hashedPassword: string) {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error: any) {
            console.log(`Erro ao comparar senhas: ${error.message}`);
            throw new Error('Erro ao comparar senhas');
        }
    }
}