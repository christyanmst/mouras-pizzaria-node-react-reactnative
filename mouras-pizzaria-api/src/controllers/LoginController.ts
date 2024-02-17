import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";

class LoginController {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        const loginService = new LoginService();

        const auth = await loginService.authenticate({
            email,
            password
        });

        return res.json(auth);
    }
}

export { LoginController }