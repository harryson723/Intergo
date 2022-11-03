
import { useContext, useEffect, useState } from "react";
import BussinesInfoContext from "../context/BussinesInfoContext";
import UserContext from "../context/UserContext";
import createId from "../helper/createIds";
import { helpHttp } from "../helper/helpHttp";
import useGetInfo from "../hooks/useGetInfo";
import "../styles/formAdd.scss";

const initialForm = {
    departamento: "1",
    municipio: "1",
    direccion: "",
}

const CreateAddressInfo = ({ NIT }) => {
    const { isLoading, setIsLoading } = useContext(UserContext);
    const { createAddress, setFlagCreateAddress, flagCreateAddress, setFormInfo: setFormInfoC } = useContext(BussinesInfoContext);
    const { info: departamentoInfo, setInfo: setDepartamentoInfo } = useGetInfo(`http://localhost:3500/ubications/getDepartamentos`, setIsLoading);
    const [municipioInfo, setMunicipioInfo] = useState([]);
    const [formInfo, setFormInfo] = useState(initialForm);

    const handleForm = e => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {
        let url = `http://localhost:3500/ubications/getMunicipios/${formInfo.departamento}`;
        helpHttp().get(url).then(res => {
            setIsLoading(true);
            if (res.error) {
                return res.error
            } else {
                if (res.length > 0) {
                    setFormInfo({
                        ...formInfo,
                        municipio: res[0].idMunicipio,
                    });
                    setMunicipioInfo(res);
                }
            }
            setIsLoading(false);
        });
    }, [formInfo.departamento]);

    useEffect(() => {
        if (departamentoInfo.length > 0) {
            setFormInfo({
                ...formInfo,
                departamento: departamentoInfo[0].idDepartamento,
            });
        }
    }, [departamentoInfo]);

    const submitForm = e => {
        e.preventDefault();
        setFormInfoC(createAddress(formInfo));
        setFlagCreateAddress(!flagCreateAddress);
    }

    return (
        <div className="divPerro">
            <form className="formAdd">
                <div>
                    <label htmlFor="departamentos">DEPARTAMENTO: </label>
                    <select id="departamentos" name="departamento" onChange={handleForm} value={formInfo.departamento}>
                        {departamentoInfo.length > 0 && departamentoInfo.map(d => <option key={d.idDepartamento} value={d.idDepartamento}>{d.nombreDepartamento}</option>)}
                    </select>
                    <label htmlFor="municipios">DEPARTAMENTO: </label>
                    <select id="municipios" name="municipio" onChange={handleForm} value={formInfo.municipio}>
                        {municipioInfo.length > 0 && municipioInfo.map(m => <option key={m.idMunicipio} value={m.idMunicipio}>{m.nombreMunicipio}</option>)}
                    </select>
                    <label htmlFor="direccion">DIRECCION: </label>
                    <textarea id="direccion" name="direccion" rows="5" maxLength="499" onChange={handleForm}></textarea>
                    <input type="submit" value="AÑADIR" onClick={submitForm} />
                </div>
            </form>
        </div>
    );
}

export default CreateAddressInfo;