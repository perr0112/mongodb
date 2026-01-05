import { faker } from '@faker-js/faker';
import { Article, Comment } from '../models/Article.js';

export const generateComments = async (users, articles) => {
    const comments = [];
    const commentTexts = [
        "Délicieux ! J'ai ajouté un peu plus de sel.",
        "Ma famille a adoré cette recette, merci !",
        "Est-ce qu'on peut remplacer le beurre par de l'huile ?",
        "Recette simple et efficace, je recommande.",
        "Un peu trop cuit à mon goût, mais très bon quand même.",
        "La meilleure version de ce plat que j'ai testée.",
        "Parfait pour un repas de dimanche soir.",
        "J'ai remplacé le sucre par du miel, c'est top !"
    ];

    for (const article of articles) {
        const nbComments = Math.floor(Math.random() * 4) + 2

        for (let i = 0; i < nbComments; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)]
            
            const comment = new Comment({
                content: commentTexts[Math.floor(Math.random() * commentTexts.length)],
                author: randomUser._id,
                article: article._id,
                createdAt: faker.date.recent({ days: 10 })
            })

            const savedComment = await comment.save()
            comments.push(savedComment)

            await Article.findByIdAndUpdate(article._id, {
                $push: { comments: savedComment._id }
            })
        }
    }

    return comments
}