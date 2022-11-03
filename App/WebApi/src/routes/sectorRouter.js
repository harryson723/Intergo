// variables para la ejecucion del servidor y sus procesos
const express = require("express");
const sectoRouter = express.Router();

// gestor de bases de datos
const {
    consultDB,
    insertDB,
    updateDB,
    deleteDB
} = require("../modules/operationsDB");

// consultar todos los tipos de documento
sectoRouter.get("/", (req, res) => {
    consultDB("SELECT * FROM sector", res);
});

module.exports = sectoRouter;