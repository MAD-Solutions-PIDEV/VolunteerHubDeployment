const express = require('express');
const { getNews, getSingleNews, addNews, updateNews, deleteNews,getNewsUnitedNations,getNewsBBcAfrica,getNewsPagination } = require('../controllers/newsController');
const router = express.Router();
const upload = require("../middlewares/upload");
const { query } = require("express-validator");

//router.get('/',getNews);
router.get('/getNewsUnitedNations',getNewsUnitedNations);
router.get('/getNewsBBcAfrica',getNewsBBcAfrica);
router.get('/:id',getSingleNews);
router.post('/addNews',upload.single("imageNews"),addNews);
router.put('/updateNews/:id',upload.single("imageNews"),updateNews);
router.delete('/delete/:id',deleteNews);
router.get("/", [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer."),
  ], getNewsPagination);

module.exports = router;
