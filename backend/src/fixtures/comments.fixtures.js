import { faker } from '@faker-js/faker';
import { Article, Comment } from '../models/Article.js';

export const generateComments = async (users, articles) => {
    const allComments = [];
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

    articles.forEach((article, index) => {
        const numberOfComments = faker.number.int({ min: 1, max: 4 });

        for (let i = 0; i < numberOfComments; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            
            allComments.push({
                content: faker.helpers.arrayElement(commentTexts),
                author: randomUser._id,
                article: article._id,
                createdAt: faker.date.recent({ days: 30 })
            })
        }
    })

    const createdComments = await Comment.insertMany(allComments);

    for (const article of articles) {
        const articleCommentIds = createdComments
            .filter(c => c.article.toString() === article._id.toString()).map(c => c._id)
            
        await Article.findByIdAndUpdate(article._id, {
            $set: { comments: articleCommentIds }
        })
    }

    return createdComments
}
