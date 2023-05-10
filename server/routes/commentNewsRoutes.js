const express = require('express');
const { addComment,deleteComment,updateComment,getCommentById } = require('../controllers/commentNewsController');
const router = express.Router();


//router.get('/',getNews);

router.post('/addComment',addComment);
router.delete('/deleteComment/:newsId/:commentId',deleteComment);
router.put('/updateComment/:id',updateComment);
router.get('/getCommentById/:id',getCommentById);


   

module.exports = router;
