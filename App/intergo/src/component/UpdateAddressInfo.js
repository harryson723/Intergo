
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

const UpdateAddressInfo = ({ NIT }) => {
    const { isLoading, setIsLoading } = useContext(UserContext);
    const { flagUpdateAddress, setFlagUpdateAddress, 
        setFormInfo: setFormInfoC, updateAddress } = useContext(BussinesInfoContext);
    const { info: departamentoInfo, setInfo: setDepartamentoInfo } = useGetInfo(`http://localhost:3500/ubications/getDepartamentos`, setIsLoading);
    const [municipioInfo, setMunicipioInfo] = useState([]);
    const [formInfo, setFormInfo] = useState(initialForm);
    const { info: bussinesInfo, setInfo: setBussinesInfo } = useGetInfo(`http://localhost:3500/bussines/getBussines/${NIT}`, setIsLoading);

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
        let url = `http://localhost:3500/ubications/getUbicationById/${bussinesInfo.FK_ubicacion}`;
        setIsLoading(true);
        helpHttp().get(url).then(res => {
            if (res.error) {
                return res.error
            } else {
                if (res.length > 0) {
                    let municipio = res[0].FK_idMunicipio;
                    let descripcion = res[0].descripcionDetallada;
                    url = `http://localhost:3500/ubications/getMunicipioById/${municipio}`;
                    helpHttp().get(url).then(res => {
                        if (res.error) {
                            return res.error
                        } else {
                            if (res.length > 0) {
                                setFormInfo({
                                    direccion: descripcion,
                                    municipio: municipio,
                                    departamento: res[0].FK_idDepartamento,
                                });
                            }
                        }
                        setIsLoading(false);
                    });
                }
            }

        });
    }, [bussinesInfo]);

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
        let info = formInfo;
        info.id = bussinesInfo.FK_ubicacion;
        updateAddress(info);
        setFlagUpdateAddress(!flagUpdateAddress);
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
                    <textarea id="direccion" name="direccion" rows="5" maxLength="499" onChange={handleForm} value={formInfo.direccion}></textarea>
                    <input type="submit" value="AÑADIR" onClick={submitForm} />
                </div>
            </form>
        </div>
    );
}

export default UpdateAddressInfo;