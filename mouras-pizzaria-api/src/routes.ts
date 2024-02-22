import { Router } from "express";
import multer from "multer";

import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CategoryControler } from "./controllers/CategoryController";
import { ProductController } from "./controllers/ProductController";
import { OrderController } from "./controllers/OrderController";
import { OrderItemController } from "./controllers/OrderItemController";

import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

const userController = new UserController();
const loginController = new LoginController();
const categoryController = new CategoryControler();
const productController = new ProductController();
const orderController = new OrderController();
const orderItemController = new OrderItemController();

// User
router.post('/users', userController.createUser);

// Login
router.get('/my-profile', isAuthenticated, loginController.myProfile);
router.post('/login', loginController.authenticate);

// Category
router.post('/category', isAuthenticated, categoryController.createCategory);
router.get('/category', isAuthenticated, categoryController.getCategories);

// Product
router.post('/product', isAuthenticated, upload.single('file'), productController.createProduct);
router.get('/product/category/:category_id', isAuthenticated, productController.getProductsByCategoryId);
router.put('/product', isAuthenticated, upload.single('file'), productController.editProduct);
router.get('/product/getAllProducts', isAuthenticated, productController.getProducts);
router.get('/product/:product_id', isAuthenticated, productController.getProduct);
router.delete('/product/delete/:product_id', isAuthenticated, productController.deleteProduct);

// Order
router.post('/order', isAuthenticated, orderController.createOrder);
router.delete('/order/:order_id', isAuthenticated, orderController.removeOrder);
router.put('/order/confirm/:order_id', isAuthenticated, orderController.confirmOrder);
router.get('/order/currentOrders', isAuthenticated, orderController.getCurrentOrders);
router.get('/order/detail/:order_id', isAuthenticated, orderController.getOrderDetails);
router.put('/order/finish/:order_id', isAuthenticated, orderController.finishOrder);

// OrderItem 
router.post('/orderItem', isAuthenticated, orderItemController.createOrderItem);
router.delete('/orderItem/:order_item_id', isAuthenticated, orderItemController.removeOrderItem);

export { router };
