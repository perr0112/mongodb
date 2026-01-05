import express from "express";
import expressAsyncHandler from "express-async-handler";

import { commentController } from "../controllers/comment.controller.js";

const commentsRouter = express.Router();

commentsRouter.post(
  "/",
  expressAsyncHandler(commentController.create)
);

commentsRouter.get(
  "/article/:articleId",
  expressAsyncHandler(commentController.getByArticle)
);

commentsRouter.delete(
  "/:id",
  expressAsyncHandler(commentController.delete)
);

export default commentsRouter;
