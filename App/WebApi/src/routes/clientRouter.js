// variables para la ejecucion del servidor y sus procesos
const express = require("express");
const clientRouter = express.Router();

// gestor de bases de datos
const {
    consultDB,
    insertDB,
    updateDB,
    deleteDB
} = require("../modules/operationsDB");
const upload = require("../modules/uploadImg");

// conseguir todos los usuarios en la base de datos
clientRouter.get("/getStudents", (req, res) => {
    consultDB("SELECT * FROM estudinates", res);
});

// conseguir un estudiante
clientRouter.get("/getStudent/:codigo", (req, res) => {
    consultDB(`SELECT * FROM estudinates where idEstudiante = ${req.params.codigo}`, res);
});

// insertar clientes en la base de datos
clientRouter.post("/insertStudent", (req, res) => {
    if (req.body) {
        let {
            code,
            firtsName,
            lastName,
            documentType,
            documentNumber,
            email,
            pass
        } = req.body;
        console.log(req.body);

        let query = "INSERT INTO estudinates( idEstudiante, numeroDocumento, nombres, apellidos, "
            + "correo, contrasena, FK_tipoDocumento) VALUES (?,?,?,?,?,?,?)";
        let data = [code, documentNumber, firtsName, lastName,
            email, pass, documentType];
        insertDB(query, data, res);
    } else {
        res.sendStatus(400);
    }

});

clientRouter.put("/updateStudent", (req, res) => {
    if (req.body) {
        let {
            idEstudiante,
            hojaDeVida,
            descripcion,
            foto,
        } = req.body;
        let query = "UPDATE estudinates SET hojaDevida=?, foto=?, descripcion=? WHERE idEstudiante = ?";
        let data = [hojaDeVida, foto, descripcion, idEstudiante];
        updateDB(query, data, res);
    } else {
        res.sendStatus(400);
    }
});


// eliminar un cliente
clientRouter.delete("/deleteStudent/:cedula", (req, res) => {
    let query = "DELETE FROM estudinantes WHERE numeroDocumento = ?";
    let data = req.params.cedula;
    deleteDB(query, data);
    res.send("Eliminado con exito");
});

clientRouter.put("/editImg", (req, res) => {
    let file = req.files.data;
    file.mv(`./src/public/img/studentImg/${file.name}`, err => {
        if (err) return res.status(500).send({ message: err })
        return res.status(200).send({ message: 'File upload' })

    });
});

clientRouter.put("/editHojaVida", (req, res) => {

    let file = req.files.data;
    file.mv(`./src/public/hojasVida/${file.name}`, err => {
        if (err) return res.status(500).send({ message: err })
        return res.status(200).send({ message: 'File upload' })

    });
});

clientRouter.put("/updateVacante/:id", (req, res) => {
    if (req.body) {
        let {
            idVacante,
        } = req.body;
        let query = "UPDATE estudinates SET FK_idVacante = ? WHERE idEstudiante = ?";
        let data = [idVacante, req.params.id];
        updateDB(query, data, res);
    } else {
        res.sendStatus(400);
    }
});

module.exports = clientRouter;