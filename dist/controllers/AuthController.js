import { AuthService } from '../services/AuthService.js';
export class AuthController {
    static async login(request, reply) {
        const { user: { email, password } } = request.body;
        try {
            const user = await AuthService.validateLogin({ email, password });
            if (user) {
                reply.code(200).send({
                    message: "Login realizado com sucesso!",
                    user: {
                        name: user.getName,
                        email: user.getEmail,
                        password: user.getPassword,
                        id: user.getId,
                        userPic: user.getUserPic,
                    }
                });
            }
            else {
                reply.code(400).send({ message: "Usuários ou senha inválidos" });
            }
        }
        catch (error) {
            switch (error.message) {
                case 'É necessário informar um email e senha para logar':
                    reply.code(400).send({ error: error.message });
                    break;
                default:
                    console.log(`Erro ao realizar o login: ${error.message}`);
                    reply.code(500).send({ error: "Erro ao realizar o login. Tente novamente mais tarde" });
                    break;
            }
        }
    }
}
