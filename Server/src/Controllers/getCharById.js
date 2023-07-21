const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();
const { URL } = process.env;

async function getCharById(req, res) {
  const {id} = req.params;

  try {
    const axiosResponse = await axios(`${URL}${id}`);

    // Destructuramos la "data" axios {data: {api}, masCosas: "..."}
    const { data } = axiosResponse; 

    // Pudo hacer la solicitud pero NO encontró al personaje
    if(data.error){
      return res.status(404).send("Not found: " + data.error);
    }

    // Pudo hacer la solicitud y SÍ encontró al personaje
    else{
      const character = {
        id: Number(id),
        name: data.name,
        status: data.status,
        species: data.species,
        gender: data.gender,
        origin: data.origin,
        image: data.image,
      };
      // Devuelve una respuesta tipo json que contiene info del personaje
      return res.status(200).json(character);
    }
  }
  catch (axiosErr) {
    // No Pude hacer la solicitud
    return res.status(500).send(axiosErr.message); 
  }
}




module.exports = {
  getCharById,
};
