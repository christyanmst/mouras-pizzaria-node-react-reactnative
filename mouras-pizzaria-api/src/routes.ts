import { Router } from "express";

import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CategoryControler } from "./controllers/CategoryController";

const router = Router();

// User
router.post('/users', isAuthenticated, new UserController().createUser);

// Login
router.post('/session', new LoginController().authenticate);
router.get('/my-profile', isAuthenticated, new LoginController().myProfile);

// Category

router.post('/category', isAuthenticated, new CategoryControler().createCategory);
router.get('/category', isAuthenticated, new CategoryControler().getCategories);


export { router };