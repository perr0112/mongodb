import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    enum: {
      values: ["Entrées", "Plats principaux", "Desserts", "Cocktails", "Autre"],
    },
  },
  // subCategories: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Category",
  //   },
  // ],
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
});

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est obligatoire"],
      trim: true,
      maxLength: [200, "Le titre ne peut pas dépasser 200 caractères"],
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      required: [true, "Le contenu est obligatoire"],
      trim: true,
      maxLength: [2000, "Le contenu ne peut pas dépasser 2000 caractères"],
    },
    comments: [
      {
        content: String,
        date: Date,
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        article: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Article",
          required: true,
        },
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublished: { type: Boolean, default: false },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      // required: true,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  {
    // options générales sur l'entité
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);
const Category = mongoose.model("Category", categorySchema);

export { Article, Category };
