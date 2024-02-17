import prismaClient from "../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}

class LoginService {
    async authenticate({ email, password }: AuthRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        });

        if (!user) throw new Error('Credential Error');

        const passowrdMatch = await compare(password, user.password);

        if (!passowrdMatch) throw new Error('Credential Error');

        const token = sign(
            {
                username: user.username,
                email: user.email,
            }, 
            process.env.JWT_SECRET,
            {
                subject: String(user.id),
                expiresIn: '15d'
            }
        )

        return { 
            id: user.id,
            username: user.username,
            email: user.email,
            token: token,
         }
    }
}

export { LoginService }