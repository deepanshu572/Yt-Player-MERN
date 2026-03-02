import express from "express";
import isAuth from "../middleware/isAuth.js";
import { deleteCommunityPost } from "../controllers/comminityController.js";

const communityRouter = express.Router();
communityRouter.put(
  "/community/:postId/DeleteCommunityPost",
  isAuth,
  deleteCommunityPost,
);
export default communityRouter;
