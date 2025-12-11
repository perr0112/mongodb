import express from "express"
import expressAsyncHandler from "express-async-handler";

import { articleController } from "../controllers/article.controller.js";

const articlesRouter = express.Router()

articlesRouter.get("/",
  expressAsyncHandler(articleController.getAll)
)
articlesRouter.post("/",
  expressAsyncHandler(articleController.create)
)

articlesRouter.get("/user/:id",
  expressAsyncHandler(articleController.getByUser)
)

articlesRouter.get("/slug/:slug",
  expressAsyncHandler(articleController.getBySlug)
)

articlesRouter.put("/:id",
  expressAsyncHandler(articleController.update)
)

articlesRouter.delete("/:id",
  expressAsyncHandler(articleController.delete)
)

export default articlesRouter
