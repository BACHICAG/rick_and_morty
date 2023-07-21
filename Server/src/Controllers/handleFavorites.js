var mayFavorites = [];

function postFav(req, res) {
    mayFavorites.push(req.body);
    return res.json(mayFavorites);
}

function deleteFav(req, res) {
    const {id} = req.params;
    const noDelete = mayFavorites.filter((pjFav) => pjFav.id !== Number(id));
    mayFavorites = noDelete;
    return  res.json(mayFavorites);
}

function getFav(req, res) {
    return res.json(mayFavorites);
}

module.exports = {
    postFav,
    deleteFav,
    getFav,
}
