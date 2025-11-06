import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    enum: {
        values: [
            "Technologie",
            "Lifestyle",
            "Voyage",
            "Cuisine",
            "Autre"
        ]
    }
  },
  //   subCategories: [{ label: String }],
  subCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
});

const userSchema = new mongoose.Schema(
  {
    _id: new mongoose.Types.ObjectId(),
    username: {
      type: String,
      required: true,
      index: { unique: true },
    },
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    isAdmin: { type: Boolean, default: false },
    email: {
      type: String,
      required: true,
    },
    // role: String, // user | admin | moderator
    createdAt: { type: Date, default: Date.now() },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

const articleSchema = new mongoose.Schema(
  {
    // ensemble des attributs de l'entité
    /*
        title
        content
        author
        isPublished
        category
        views
        */
    title: {
      type: String,
      required: [true, "Le titre est obligatoire"],
      trim: true,
      maxLength: [200, "Le titre ne peut pas dépasser 200 caractères"],
    },
    content: {
      type: String,
      required: [true, "Le contenu est obligatoire"],
      trim: true,
      maxLength: [2000, "Le contenu ne peut pas dépasser 2000 caractères"],
    },
    // comments: [{ content: String, date: Date, author: User }],
    comments: [
      {
        content: String,
        date: Date,
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
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
      required: true,
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

const User = mongoose.model("User", userSchema);
const Article = mongoose.model("Article", articleSchema);
const Category = mongoose.model("Category", categorySchema);
