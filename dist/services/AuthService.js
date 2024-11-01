import { UserDAL } from "../dal/UserDAL.js";
import { UserService } from "./UserService.js";
export class AuthService {
    static async validateLogin(user) {
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
        }
        catch (error) {
            console.error('Erro ao validar o login:', error.message);
            throw new Error(error.message);
        }
    }
}
