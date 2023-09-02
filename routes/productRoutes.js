import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, productCountController, productListController, searchProductController, updateProductController } from '../controllers/productController.js';

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

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get('/product-count',productCountController);

//product per page
router.get('/product-list/:page', productListController);

//search product
router.get("/search/:keyword", searchProductController);

export default router;
