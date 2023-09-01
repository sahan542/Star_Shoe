import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, updateProductController } from '../controllers/productController.js';

const router = express.Router();

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);

//routes
router.post('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);

//get products
router.get('/get-product', getProductController);

//single Product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get('/product-photo/:pid', productPhotoController);

//delete Product
router.delete('/product/:pid', deleteProductController);

export default router;
