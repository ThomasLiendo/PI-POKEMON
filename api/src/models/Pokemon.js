const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    //cada modelo q definimos
    id: {
      type: DataTypes.UUID, //UUID es para que genere un número random con letras/números y único, habilitado en sql
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, //no permito que esté vacío
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    health: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING, //puse .text para que cuando se ponga una imagen me permita mas caracteres para poner un link largo
      allowNull: true,
    },
    createInDb: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "true",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
