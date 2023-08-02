const express = require("express");
const jwtMiddleware = require("../jwtMiddleware");
const addArticle = require("../controllers/article/addArticle");
const deleteArticle = require("../controllers/article/deleteArticle");
const editArticle = require("../controllers/article/editArticle");
const getArticlesCategory = require("../controllers/article/getArticlesCategory");
const getArticlesSubcategory = require("../controllers/article/getArticlesSubcategory");
const getOneArticle = require("../controllers/article/getOneArticle");
const getLatestArticles = require("../controllers/article/getLatestArticles");

const articleRouter = express.Router();
articleRouter.post("/", jwtMiddleware, addArticle);
articleRouter.delete("/:art_id", jwtMiddleware, deleteArticle);
articleRouter.put("/:art_id", jwtMiddleware, editArticle);
articleRouter.get("/", getLatestArticles);
articleRouter.get("/cat/:cat_id", getArticlesCategory);
articleRouter.get("/sc/:sc_id", getArticlesSubcategory);
articleRouter.get("/art/:art_id", getOneArticle);
module.exports = articleRouter;
