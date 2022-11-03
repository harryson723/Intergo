import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { helpHttp } from "../helper/helpHttp";
import useGetInfo from "../hooks/useGetInfo";
import Loader from "./Loader";

const initialForm = {
    codigo: "",
    objeto: "",
    fechaInicio: "",
    fechaFinal: "",
}

const BussinesOptionCon = ({ b }) => {
    const { isLoading, setIsLoading } = useContext(UserContext);
    const { info: convenioInfo } = useGetInfo(`http://localhost:3500/convenios/getConvenios/${b.NIT}`, setIsLoading);
    const [formInfo, setformInfo] = useState(initialForm);

    useEffect(() => {
        setformInfo(Array.isArray(convenioInfo) ? initialForm : convenioInfo);
        if (convenioInfo.fechaInicio) {
            let anioI = convenioInfo.fechaInicio.substring(0, 4);
            let mesI = convenioInfo.fechaInicio.substring(5, 7);
            let diaI = convenioInfo.fechaInicio.substring(8, 10);
            let anioF = convenioInfo.fechaFinal.substring(0, 4);
            let mesF = convenioInfo.fechaFinal.substring(5, 7);
            let diaF = convenioInfo.fechaFinal.substring(8, 10);

            setformInfo({
                ...convenioInfo,
                fechaInicio: `${anioI}-${mesI}-${diaI}`,
                fechaFinal: `${anioF}-${mesF}-${diaF}`,
            });
        }
    }, [convenioInfo]);

    const handleForm = e => {
        setformInfo({
            ...formInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (convenioInfo.codigo) {

        } else {
            formInfo.NIT = b.NIT;
            let options = {
                body: formInfo,
                headers: {
                    "content-type": "application/json"
                }
            };
            let url = `http://localhost:3500/convenios/insertConvenio/`;
            helpHttp().post(url, options).then((res) => {
                if (res.status === 512) {
                    console.log('HOla');
                } else {

                }
            });
        }

    };

    return (
        <div>
            {isLoading && <Loader />}
            <form>
                <label htmlFor="codigo">Codigo: </label>
                <input name="codigo" id="codigo" value={formInfo.codigo} onChange={handleForm} />
                <label htmlFor="objeto">OBJETO: </label>
                <input name="objeto" id="objeto" value={formInfo.objeto} onChange={handleForm} />
                <label htmlFor="fechaInicio">FECHA INICIO: </label>
                <input type="date" name="fechaInicio" id="fechaInicio" value={formInfo.fechaInicio} onChange={handleForm} />
                <label htmlFor="fechaFinal">FECHA FINAL: </label>
                <input type="date" name="fechaFinal" id="fechaFinal" value={formInfo.fechaFinal} onChange={handleForm} />
                <input type="submit" value={convenioInfo.codigo ? "ACTUALIZAR" : "CREAR"} onClick={handleSubmit} />
            </form>
        </div>
    );
}

export default BussinesOptionCon;