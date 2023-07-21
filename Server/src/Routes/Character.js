//Rutas de Characters
const express = require("express");
const { getCharById } = require("../Controllers/getCharById");

const characterRouter = express.Router();
// Todas las req que lleguen a este archivo tienen el "/character" IMPLICITO

// Para poder llegar a la ruta "3001/character/id"
characterRouter.get("/:id", getCharById);

module.exports = {
    characterRouter,
}