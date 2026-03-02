import express from "express";
import isAuth from "../middleware/isAuth.js";
import { handlePlaylistSave, handleDeletePlaylist, handleUpdatePlaylist } from "../controllers/playlistController.js";

const playlistRouter = express.Router();

playlistRouter.put("/playlist/:playlistId/save", isAuth, handlePlaylistSave);
playlistRouter.put("/playlist/:playlistId/DeletePlaylist", isAuth, handleDeletePlaylist);
playlistRouter.post("/playlist/:playlistId/UpdatePlaylist", isAuth, handleUpdatePlaylist);

export default playlistRouter;
