import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// User
router.post('/users', new UserController().createUser);

// Login
router.post('/session', new LoginController().authenticate);
router.get('/my-profile', isAuthenticated, new LoginController().myProfile);

export { router };