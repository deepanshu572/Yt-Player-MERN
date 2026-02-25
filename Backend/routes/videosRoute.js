import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  handletoggleLikes,
  handletoggleDisLikes,
  handleSaveBy,
  handleAddComment,
  handleAddReply,
  handleAddViews,
  handleUpdateVideo,
  handleDeleteVideo
} from "../controllers/videoController.js";
import upload from "../middleware/multer.js";

const videosRouter = express.Router();

videosRouter.put("/video/:videoId/likeToggle", isAuth, handletoggleLikes);
videosRouter.put("/video/:videoId/DislikeToggle", isAuth, handletoggleDisLikes);
videosRouter.put("/video/:videoId/savevideo", isAuth, handleSaveBy);
videosRouter.post("/video/:videoId/AddComment", isAuth, handleAddComment);
videosRouter.post("/video/:videoId/AddReply", isAuth, handleAddReply);
videosRouter.put("/video/:videoId/AddViews", isAuth, handleAddViews);
videosRouter.post(
  "/video/:videoId/UpdateVideo",
  isAuth,
  upload.single("videoBanner"),
  handleUpdateVideo,
);
videosRouter.put(
  "/video/:videoId/DeleteVideo",
  isAuth,
  handleDeleteVideo,
);

export default videosRouter;
