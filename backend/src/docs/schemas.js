/**
 * @swagger
 * components:
 *   schemas:
 *     MongoId:
 *       type: string
 *       description: Identifiant MongoDB (ObjectId)
 *       example: "507f1f77bcf86cd799439011"
 *
 *     Comment:
 *       type: object
 *       required:
 *         - content
 *         - author
 *         - article
 *       properties:
 *         _id:
 *           $ref: "#/components/schemas/MongoId"
 *         content:
 *           type: string
 *           maxLength: 500
 *           example: "Super recette, merci !"
 *         author:
 *           $ref: "#/components/schemas/MongoId"
 *         article:
 *           $ref: "#/components/schemas/MongoId"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-12-18T10:15:30.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-12-18T10:20:00.000Z"
 *
 *     Article:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         _id:
 *           $ref: "#/components/schemas/MongoId"
 *         title:
 *           type: string
 *           maxLength: 200
 *           example: "Tiramisu express"
 *         slug:
 *           type: string
 *           description: Unique
 *           example: "tiramisu-express"
 *         content:
 *           type: string
 *           maxLength: 2000
 *           example: "Étapes: ... Ingrédients: ..."
 *         comments:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Comment"
 *         author:
 *           $ref: "#/components/schemas/MongoId"
 *         isPublished:
 *           type: boolean
 *           default: false
 *           example: true
 *         duration:
 *           type: integer
 *           minimum: 0
 *           example: 30
 *         categories:
 *           type: array
 *           allOf:
 *             - $ref: "#/components/schemas/MongoId"
 *           nullable: true
 *         views:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *           example: 42
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-12-18T10:15:30.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-12-18T10:20:00.000Z"
 *
 *     Category:
 *       type: object
 *       required:
 *         - label
 *       properties:
 *         _id:
 *           $ref: "#/components/schemas/MongoId"
 *         label:
 *           type: string
 *           enum:
 *             - "Entrées"
 *             - "Plats principaux"
 *             - "Desserts"
 *             - "Cocktails"
 *             - "Autre"
 *           example: "Desserts"
 *         articles:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/MongoId"
 *
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - lastName
 *         - firstName
 *         - email
 *         - role
 *       properties:
 *         _id:
 *           $ref: "#/components/schemas/MongoId"
 *         username:
 *           type: string
 *           description: Unique
 *           example: "jdoe"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         firstName:
 *           type: string
 *           example: "John"
 *         email:
 *           type: string
 *           format: email
 *           description: Unique
 *           example: "john.doe@email.com"
 *         role:
 *           type: string
 *           enum:
 *             - "user"
 *             - "admin"
 *             - "moderator"
 *           default: "user"
 *           example: "user"
 *         avatarUrl:
 *           type: string
 *           nullable: true
 *           example: "https://cdn.example.com/avatars/jdoe.png"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-12-18T10:15:30.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-12-18T10:20:00.000Z"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Une erreur est survenue"
 *
 *     LoginRequest:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "admin@lcg-dev.com"
 *         password:
 *           type: string
 *           example: "admin123"
 *
 *     RegisterRequest:
 *       type: object
 *       required: [username, firstName, lastName, email, password]
 *       properties:
 *         username:
 *           type: string
 *           example: "testuser"
 *         firstName:
 *           type: string
 *           example: "Test"
 *         lastName:
 *           type: string
 *           example: "User"
 *         email:
 *           type: string
 *           format: email
 *           example: "testuser@example.com"
 *         password:
 *           type: string
 *           example: "testpassword"
 *         role:
 *           type: string
 *           enum: ["user", "admin", "moderator"]
 *           example: "user"
 *
 *     ArticleCreateRequest:
 *       type: object
 *       required: [title, content, author]
 *       properties:
 *         title:
 *           type: string
 *           maxLength: 200
 *           example: "Nouvel article"
 *         content:
 *           type: string
 *           maxLength: 2000
 *           example: "Contenu d'un nouvel article."
 *         author:
 *           $ref: "#/components/schemas/MongoId"
 *
 *     ArticleUpdateRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           maxLength: 200
 *           example: "Article modifié"
 *         content:
 *           type: string
 *           maxLength: 2000
 *           example: "Nouveau contenu"
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
