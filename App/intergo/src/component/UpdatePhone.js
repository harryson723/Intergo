import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import BussinesInfoContext from "../context/BussinesInfoContext";
import StudentInfoContext from "../context/StudentInfoContext";
import "../styles/formAdd.scss";

const UpdatePhone = ({ NIT, contacInfo }) => {

    const [formInfo, setFormInfo] = useState("");
    const { flagUpdatePhone, setFlagUpdatePhone,
        createInfoContact, updateInfoContact } = useContext(BussinesInfoContext);
    const params = useParams();

    const handelInput = (e) => {
        setFormInfo(e.target.value);
    };

    const close = () => {
        if (contacInfo.length === 0) createInfoContact({ NIT, telefono: formInfo, });
        else updateInfoContact({ NIT, telefono: formInfo, correo: contacInfo.correo });
        setFlagUpdatePhone(!flagUpdatePhone);

    };

    return (
        <div className="divPerro">
            <form className="formAdd">
                <div>
                    <label htmlFor="inputAdd">{ }</label>
                    <input id="inputAdd" value={formInfo} onChange={handelInput} />
                    <button className="btnAddGeneric" onClick={close}>AGREGAR</button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePhone;