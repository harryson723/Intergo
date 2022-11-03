// variables para la ejecucion del servidor y sus procesos
const express = require("express");
const socialMediaRouter = express.Router();

// gestor de bases de datos
const {
    consultDB,
    insertDB,
    updateDB,
    deleteDB
} = require("../modules/operationsDB");
const upload = require("../modules/uploadImg");

// conseguir todos los usuarios en la base de datos
socialMediaRouter.get("/getSocialMediaType", (req, res) => {
    consultDB("SELECT * FROM tipored", res);
});

// conseguir todos los usuarios en la base de datos
socialMediaRouter.get("/getSocialMediaById/:id", (req, res) => {
    consultDB(`SELECT * FROM redessociales WHERE FK_idInfo = ${req.params.id}`, res);
});

// conseguir un estudiante
socialMediaRouter.get("/getStudent/:codigo", (req, res) => {
    consultDB(`SELECT * FROM estudinates where idEstudiante = ${req.params.codigo}`, res);
});

// insertar clientes en la base de datos
socialMediaRouter.post("/insertSocialMedia", (req, res) => {
    if (req.body) {
        let {
            idTipoRed,
            url,
            idInfo,
        } = req.body;
        console.log(req.body);

        let query = "INSERT INTO redessociales( url, FK_idTipoRed, FK_idInfo) VALUES (?,?,?)";
        let data = [url, idTipoRed, idInfo];
        insertDB(query, data, res);
    } else {
        res.sendStatus(400);
    }

});

socialMediaRouter.put("/updateStudent", (req, res) => {
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
socialMediaRouter.delete("/deleteStudent/:cedula", (req, res) => {
    let query = "DELETE FROM estudinantes WHERE numeroDocumento = ?";
    let data = req.params.cedula;
    deleteDB(query, data);
    res.send("Eliminado con exito");
});

socialMediaRouter.put("/editImg", (req, res) => {
    let file = req.files.data;
    file.mv(`./src/public/img/studentImg/${file.name}`, err => {
        if (err) return res.status(500).send({ message: err })
        return res.status(200).send({ message: 'File upload' })

    });
});

socialMediaRouter.put("/editHojaVida", (req, res) => {

    let file = req.files.data;
    file.mv(`./src/public/hojasVida/${file.name}`, err => {
        if (err) return res.status(500).send({ message: err })
        return res.status(200).send({ message: 'File upload' })

    });
});

module.exports = socialMediaRouter;