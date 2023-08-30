import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, getProductController } from '../controllers/productController.js';

const router = express.Router();

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

//get products
router.get('/get-product', getProductController);

//single Product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get('/product-photo/:pid', productPhotoController);

export default router;
