import { UserDAL } from "../dal/UserDAL.js";
import { UserModel } from "../models/UserModel.js";
import { UserService } from "./UserService.js";

export class AuthService {
    static async validateLogin(user: { email: string, password: string }): Promise<UserModel | null> {
        if (!user.email || !user.password) {
            throw new Error("É necessário informar um email e senha para logar");            
        }

        try {
            if (!UserService.isValidEmail(user.email)) {
                return null;
            }

            const userFetched = await UserDAL.selectByEmail(user.email);

            if (userFetched && userFetched.getPassword === user.password) {
                return userFetched;
            }

            return null;
        } catch (error: any) {
            console.error('Erro ao validar o login:', error.message);
            throw new Error(error.message);
        }
    }
}