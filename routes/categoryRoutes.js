import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
//create category
router.post('create-category', requireSignIn,isAdmin, createCategoryController);

//update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//get All category
router.get('/get-category', categoryController);

//single Category
router.get('/single-category',singleCategoryController);

//Delete Category
router.delete('/delete-category', requireSignIn,isAdmin, categoryController);

export default router;