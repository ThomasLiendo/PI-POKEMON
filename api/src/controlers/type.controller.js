const { getTypesApi } = require("../controlers/pokemon.controller");

const findAllTypes = async (req, res) => {
  try {
    const type = await getTypesApi();
    res.status(201).json(type);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = { findAllTypes };
