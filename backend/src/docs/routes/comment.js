/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Commentaires
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     tags: [Comments]
 *     summary: Créer un commentaire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CommentCreateRequest"
 *     responses:
 *       201:
 *         description: Commentaire créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Comment"
 *       400:
 *         description: Requête invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Article ou utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /comments/article/{articleId}:
 *   get:
 *     tags: [Comments]
 *     summary: Lister les commentaires d'un article
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/MongoId"
 *         description: ID MongoDB de l'article
 *     responses:
 *       200:
 *         description: Liste des commentaires de l'article
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Comment"
 *       404:
 *         description: Article non trouvé ou aucun commentaire
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Supprimer un commentaire
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: "#/components/schemas/MongoId"
 *         description: ID MongoDB du commentaire
 *     responses:
 *       200:
 *         description: Commentaire supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "Commentaire supprimé avec succès" }
 *                 comment:
 *                   $ref: "#/components/schemas/Comment"
 *       404:
 *         description: Commentaire non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
