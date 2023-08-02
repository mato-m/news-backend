const express = require("express");
const addCategory = require("../controllers/category/AddCategory");
const jwtMiddleware = require("../jwtMiddleware");
const addSubcategory = require("../controllers/category/addSubcategory");
const deleteSubcategory = require("../controllers/category/deleteSubcategory");
const deleteCategory = require("../controllers/category/deleteCategory");
const getAllCategories = require("../controllers/category/getAllCategories");
const getSubcategories = require("../controllers/category/getSubcategories");
const getArtTag = require("../controllers/category/getArtTag");

const categoryRouter = express.Router();
categoryRouter.post("/cat", jwtMiddleware, addCategory);
categoryRouter.post("/sc", jwtMiddleware, addSubcategory);
categoryRouter.delete("/cat/:cat_id", jwtMiddleware, deleteCategory);
categoryRouter.delete("/sc/:sc_id", jwtMiddleware, deleteSubcategory);
categoryRouter.get("/cat", getAllCategories);
categoryRouter.get("/sc", getSubcategories);
categoryRouter.get("/tag/:tag", getArtTag);
module.exports = categoryRouter;
