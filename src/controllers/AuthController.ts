import { TokenModel } from '../models/TokenModel.js';
import { AuthService } from '../services/AuthService.js';

export class AuthController {
    static async login(email: string, password: string): Promise<boolean|undefined> {
        try {
            const user = await AuthService.validateLogin(email, password);

            if (user != null) {
                await TokenModel.storeUserToken(TokenModel.generateToken(user));
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Erro ao realizar o login:', error);
        }
    }

    static async logout() {
        try {
            await TokenModel.removeToken();
        } catch (error) {
            console.log(`Erro ao realizar logout: ${error}`)
        }
    }
}
