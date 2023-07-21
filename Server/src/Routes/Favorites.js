const express = require("express");
const { postFav, deleteFav, getFav } = require("../Controllers/handleFavorites");

const favoritesRouter = express.Router();

favoritesRouter.get("/", getFav);
favoritesRouter.post("/", postFav);
favoritesRouter.delete("/:id", deleteFav);

module.exports = {favoritesRouter}