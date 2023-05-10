const News = require('../models/news');
const CommentNews = require('../models/commentNews');

const addComment = async (req, res, next) => {
  const { newsId, userId, text } = req.body;
console.log("id news "+newsId)
console.log("id user "+userId)
console.log("id user " + JSON.stringify(req.body))

  try {
    const news = await News.findById(newsId);

    if (!news) {
      throw new Error('News not found');
    }

    const newComment = new CommentNews({
      user: userId,
      text: text,
    });

    await newComment.save();

    news.commentNews.push(newComment._id);

    await news.save();

    res.status(201).json({ comment: newComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res, next) => {
    const { newsId, commentId } = req.params;
  
    try {
      const news = await News.findByIdAndUpdate(
        newsId,
        { $pull: { commentNews: commentId } },
        { new: true }
      );
  
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
  
      await CommentNews.findByIdAndDelete(commentId);
  
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateComment = async (req, res, next) => {
    const { id } = req.params;
    const { text } = req.body;
  
    try {
      const comment = await CommentNews.findById(id);
  
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      comment.text = text;
      const updatedComment = await comment.save();
  
      res.status(200).json({ comment: updatedComment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getCommentById = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const comment = await CommentNews.findById(id);
  
      if (!comment) {
        throw new Error('Comment not found');
      }
  
      res.status(200).json({ comment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  
module.exports = {
    addComment,deleteComment,updateComment,getCommentById
}
