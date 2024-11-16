import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET!;

export class TokenService {
    static compareSecret(secret: string): boolean {
        if (secret != JWT_SECRET) {
            console.log(secret, JWT_SECRET)
            return false;
        }

        return true;
    }

    static generateToken(id: string, email: string): string {
        const payload = { id, email };
        const token = jwt.sign(payload, JWT_SECRET!);
        return token;
    }

    static getTokenData(token: string): JwtPayload {
        return jwt.verify(token, JWT_SECRET!) as JwtPayload;
    }

    static validateToken(token: string | undefined): boolean {
        try {
            if (!token) {
                return false;
            }

            jwt.verify(token, JWT_SECRET!);

            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}


