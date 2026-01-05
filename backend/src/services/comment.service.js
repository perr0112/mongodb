import { Article } from "../models/Article.js";
import { Comment } from "../models/Article.js";

const createComment = async (content, author, articleId) => {
  try {
    const comment = new Comment({
      content,
      author,
      article: articleId,
    })

    await comment.save()

    await Article.findByIdAndUpdate(
      articleId,
      {
        $addToSet: { comments: comment._id },
        updatedAt: Date.now(),
      },
      { new: true }
    )

    return comment.populate("author");
  } catch (error) {
    console.error("-------------- Erreur lors de la création d'un commentaire", error)
  }
}

const getCommentsByArticle = async (articleId) => {
  const comments = await Comment.find({ article: articleId })
    .populate("author")
    .sort({ createdAt: -1 })

  return comments
}

const getCommentById = async (id) => {
  const comment = await Comment.findById(id).populate("author")
  return comment
}

const deleteComment = async (commentId) => {
  try {
    const comment = await Comment.findById(commentId)
    if (!comment) return

    await Comment.findByIdAndDelete(commentId)

    await Article.findByIdAndUpdate(comment.article, {
      $pull: { comments: commentId },
      updatedAt: Date.now(),
    })
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire", error)
  }
}

export {
  createComment,
  getCommentsByArticle,
  getCommentById,
  deleteComment,
};
