import { Router } from "express";
import multer from "multer";

import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CategoryControler } from "./controllers/CategoryController";
import { ProductController } from "./controllers/ProductController";

import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// User
router.post('/users', isAuthenticated, new UserController().createUser);

// Login
router.post('/session', new LoginController().authenticate);
router.get('/my-profile', isAuthenticated, new LoginController().myProfile);

// Category

router.post('/category', isAuthenticated, new CategoryControler().createCategory);
router.get('/category', isAuthenticated, new CategoryControler().getCategories);

// Product
router.post('/product', isAuthenticated, upload.single('file'), new ProductController().createProduct);
router.get('/product/category/:category_id', isAuthenticated, new ProductController().getProductsByCategoryId);
export { router };