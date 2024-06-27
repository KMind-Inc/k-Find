var arrayLikeToArray = require("./arrayLikeToArray");

function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return arrayLikeToArray(r);
}

module.exports = _arrayWithoutHoles;