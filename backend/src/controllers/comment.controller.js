import {
  createComment,
  deleteComment,
  getCommentsByArticle,
  getCommentById,
} from "../services/comment.service.js";

import { getUserFromId } from "../services/user.service.js";
import { getArticleById } from "../services/articles.service.js";

import { HTTPStatus } from "../config/httpStatus.js";

class CommentController {
  async create(req, res, next) {
    const { content, author, article } = req.body;

    if (!content || !author || !article) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ message: "Les champs content, author et article sont requis" })
    }

    const user = await getUserFromId(author)
    if (!user) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ message: "Utilisateur non trouvé" })
    }

    const targetArticle = await getArticleById(article)
    if (!targetArticle) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ message: "Article non trouvé" })
    }

    const comment = await createComment(content, author, article)

    if (!comment) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ message: "Erreur lors de la création du commentaire" })
    }

    return res.status(HTTPStatus.CREATED).json(comment)
  }

  async getByArticle(req, res, next) {
    const articleId = req.params.articleId

    const targetArticle = await getArticleById(articleId)
    if (!targetArticle) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ message: "Article non trouvé" })
    }

    const comments = await getCommentsByArticle(articleId)

    if (!comments || comments.length === 0) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ message: "Aucun commentaire trouvé pour cet article" })
    }

    return res.status(HTTPStatus.OK).json(comments)
  }

  async delete(req, res, next) {
    const commentId = req.params.id;

    const comment = await getCommentById(commentId)
    if (!comment) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ message: "Commentaire non trouvé" })
    }

    await deleteComment(commentId);

    return res.status(HTTPStatus.OK).json({
      message: "Commentaire supprimé avec succès",
      comment,
    });
  }
}

export const commentController = new CommentController()
