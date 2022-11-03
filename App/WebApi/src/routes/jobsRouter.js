// variables para la ejecucion del servidor y sus procesos
const express = require("express");
const jobsRouter = express.Router();

// gestor de bases de datos
const {
    consultDB,
    insertDB,
    updateDB,
    deleteDB
} = require("../modules/operationsDB");

jobsRouter.get("/getJobs/:codigo", (req, res) => {
    consultDB(`SELECT * FROM cargos where FK_idEstudiante = ${req.params.codigo}`, res);
});

jobsRouter.post('/insertJob', (req, res) => {
    if(req.body) {
        let {
            formInfo,
            idUser
        } = req.body;
        let data = [ formInfo, idUser];
        let query = "INSERT INTO cargos(nombre, FK_idEstudiante) VALUES" +
            " (?,?)";
        insertDB(query, data, res);
    } else  res.sendStatus(400);
});

// eliminar un cliente
jobsRouter.delete("/deleteJob/:id", (req, res) => {
    let query = "DELETE FROM cargos WHERE idCargo = ?";
    let data = req.params.id;
    console.log(data);
    deleteDB(query, data);
    res.sendStatus(200);
});



module.exports = jobsRouter;