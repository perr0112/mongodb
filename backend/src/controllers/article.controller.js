import { createArticle, deleteArticle, getArticleById, getArticleBySlug, getArticles, getArticlesByUser, updateArticle } from "../services/articles.service.js"
import { getUserFromId } from "../services/user.service.js"

class Articlecontroller {
    async create(req, res, next) {
        const { title, content, author } = req.body
        const article = await createArticle(title, content, author)

        if (!article) {
            res.status(500).json({ message: "Erreur lors de la création de l'article" })
            return
        }

        res.json({
            message: "Article créé avec succès",
            article,
        })

        next()
    }

    async getAll(req, res, next) {
        const articles = await getArticles()
        res.json(articles)

        next()
    }

    async getByUser(req, res, next) {
        const authorId = req.params.id
        const user = await getUserFromId(authorId)

        console.log("Author ID:", authorId, "User:", user)

        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé" })
            return
        }

        const articles = await getArticlesByUser(authorId)
        res.json(articles)

        next()
    }

    async getBySlug(req, res, next) {
        const slug = req.params.slug
        const article = await getArticleBySlug(slug)

        if (!article) {
            res.status(404).json({ message: "Article non trouvé" })
            return
        }

        console.log("Slug:", slug, "Article:", article)

        res.json(article)

        next()
    }

    async update(req, res, next) {
        const { title, content } = req.body
        const articleId = req.params.id

        const article = await updateArticle(articleId, title, content)

        if (!article) {
            res.status(404).json({ message: "Article non trouvé" })
            return
        }

        res.json({
            message: "Article mis à jour avec succès",
            article,
        })

        next()
    }

    async delete(req, res, next) {
        const articleId = req.params.id
        const article = await getArticleById(articleId)

        if (!article) {
            res.status(404).json({ message: "Article non trouvé" })
            return
        }

        await deleteArticle(articleId)

        res.json({
            message: "Article supprimé avec succès",
            article,
        })

        next()
    }
}

export const articleController = new Articlecontroller()
