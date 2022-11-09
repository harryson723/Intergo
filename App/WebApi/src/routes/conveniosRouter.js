// variables para la ejecucion del servidor y sus procesos
const express = require("express");
const conveniosRouter = express.Router();

// gestor de bases de datos
const {
    consultDB,
    insertDB,
    updateDB,
    deleteDB
} = require("../modules/operationsDB");


// conseguir todos los usuarios en la base de datos
conveniosRouter.get("/getConvenios", (req, res) => {
    consultDB("SELECT * FROM estudinates", res);
});

// conseguir un estudiante
conveniosRouter.get("/getConvenios/:nit", (req, res) => {
    consultDB(`SELECT * FROM convenios where FK_NIT = ${req.params.nit}`, res);
});

// insertar clientes en la base de datos
conveniosRouter.post("/insertConvenio", (req, res) => {
    if (req.body) {
        let {
            codigo,
            objeto,
            fechaInicio,
            fechaFinal,
            NIT,
        } = req.body;
        console.log(codigo, NIT);
        let query = "INSERT INTO convenios( codigo, objeto, fechaInicio, fechaFinal, "
            + "FK_NIT) VALUES (?,?,?,?,?)";
        let data = [codigo, objeto, fechaInicio, fechaFinal, NIT];
        insertDB(query, data, res);
    } else {
        res.sendStatus(400);
    }

});

conveniosRouter.put("/updateConvenio", (req, res) => {
    if (req.body) {
        let {
            objeto,
            fechaInicio,
            fechaFinal,
            NIT,
        } = req.body;
        let query = "UPDATE convenios SET objeto=?, fechaInicio=?, fechaFinal=? WHERE FK_NIT = ?";
        let data = [objeto, fechaInicio, fechaFinal, NIT];
        updateDB(query, data, res);
    } else {
        res.sendStatus(400);
    }
});


module.exports = conveniosRouter;