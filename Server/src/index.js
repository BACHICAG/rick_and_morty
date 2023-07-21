const dotenv = require("dotenv");
dotenv.config();
const { PORT } = process.env;

const { server } = require("./App.js");

server.listen(PORT, () => {
  console.log("Server raised in port: " + PORT);
});
