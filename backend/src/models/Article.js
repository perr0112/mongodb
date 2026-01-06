import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    enum: {
      values: [
        "Entrées",
        "Plats",
        "Desserts",
        "Cocktails",
        "Facile",
        "Intermédiaire",
        "Difficile",
      ],
    },
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
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
    coverImage: {
      type: String,
      required: false,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    duration: {
      type: Number,
      min: 0,
    },
    isPublished: { type: Boolean, default: false },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0, min: 0 },
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
  },
);

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500,
    },
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
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
const Category = mongoose.model("Category", categorySchema);
const Comment = mongoose.model("Comment", commentSchema);

export { Article, Category, Comment };
