const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

//------------ Routes ------------

const { characterRouter } = require("./Routes/Character.js");
const { userRouter } = require("./Routes/User.js");
const { favoritesRouter } = require("./Routes/Favorites.js");

//------------ Creación del Servidor ------------ 

const server = express();

//------------ Middlewars ------------

// Para poder recibir JSON por req.body
server.use(express.json());

// Muestra en consola como sale la REQ y la RES
server.use(morgan("dev"));

//------------ Permisos -> Cors ------------

// Habilito las cors para que las solicitudes enviadas de cualquier origen puedan ser recibidas por mi servidor
server.use(cors());

//------------ Routers -> Que rutas voy a usar ------------

server.use("/character", characterRouter);
server.use("/user", userRouter);
server.use("/favorites", favoritesRouter);

server.get("/health-check/:id", (req, res) => {
  res.send("Workin!");
});

module.exports = server;
