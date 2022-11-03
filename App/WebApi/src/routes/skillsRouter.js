// variables para la ejecucion del servidor y sus procesos
const express = require("express");
const skillsRouter = express.Router();

// gestor de bases de datos
const {
    consultDB,
    insertDB,
    updateDB,
    deleteDB
} = require("../modules/operationsDB");

skillsRouter.get("/getSkills/:codigo", (req, res) => {
    consultDB(`SELECT * FROM habilidades where FK_idEstudiante = ${req.params.codigo}`, res);
});

skillsRouter.post('/insertSkill', (req, res) => {
    if(req.body) {
        let {
            formInfo,
            idUser
        } = req.body;
        let data = [ formInfo, idUser];
        let query = "INSERT INTO habilidades(nombre, FK_idEstudiante) VALUES" +
            " (?,?)";
        insertDB(query, data, res);
    } else  res.sendStatus(400);
});

// eliminar un cliente
skillsRouter.delete("/deleteSkill/:id", (req, res) => {
    let query = "DELETE FROM habilidades WHERE idHabilidad = ?";
    let data = req.params.id;
    console.log(data);
    deleteDB(query, data);
    res.sendStatus(200);
});



module.exports = skillsRouter;