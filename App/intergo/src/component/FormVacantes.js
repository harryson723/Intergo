import { useState } from "react";
import { useParams } from "react-router-dom";
import { helpHttp } from "../helper/helpHttp";
import "../styles/formVacantes.scss";

const initialState = {
    nombre: "",
    descripcion: "",
    plazas: 0,
    fecha: "",
}

const FormVacantes = () => {

    const [formInfo, setFormInfo] = useState(initialState);
    const params = useParams();
    const handleForm = e => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        formInfo.NIT = params.NIT;
        let options = {
            body: formInfo,
            headers: {
                "content-type": "application/json"
            }
        };
        let url = `http://localhost:3500/vacantes/insertVacante/`;
        helpHttp().post(url, options).then((res) => {

        });
        setFormInfo(initialState);
    }
    return (
        <form className="formVacante">

            <div>
                <label htmlFor="titulo">TITULO DE LA VACANTE:</label>
                <input id="titulo" name="nombre" value={formInfo.nombre} onChange={handleForm} />
                <label htmlFor="descripcion">DESCRIPCION DE LA VACANTE</label>
                <textarea id="descripcion" name="descripcion" value={formInfo.descripcion} onChange={handleForm} rows="6"></textarea>
            </div>
            <div>
                <label htmlFor="plazas">NUMERO DE PLAZAS DISPONIBLES</label>
                <input type="number" id="plazas" name="plazas" value={formInfo.plazas} onChange={handleForm} />
                <label htmlFor="fecha">FECHA DE PUBLICACION:</label>
                <input type="date" id="fecha" name="fecha" value={formInfo.fecha} onChange={handleForm}/>
                <input type="submit" value="CREAR VACANTE" onClick={handleSubmit} />
            </div>
        </form>
    );
}

export default FormVacantes;