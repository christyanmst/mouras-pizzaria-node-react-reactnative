import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";

const router = Router();

router.post('/users', new UserController().createUser);
router.post('/session', new LoginController().authenticate);

export { router };