import { UserDAL } from "../dal/UserDAL.js";
import { UserModel } from "../models/UserModel.js";
import { UserService } from "./UserService.js";

export class AuthService {
    static async validateLogin(email: string, password: string): Promise<UserModel | null> {
        if (!UserService.isValidEmail(email)) {
            return null;
        }

        const user = await UserDAL.selectByEmail(email);
        if (user && user.getPassword === password) {
            return user;
        }

        return null;
    }
}