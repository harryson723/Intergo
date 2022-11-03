import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import BussinesInfoContext from "../context/BussinesInfoContext";
import StudentInfoContext from "../context/StudentInfoContext";
import "../styles/formAdd.scss";

const UpdateMail = ({ NIT, contacInfo }) => {

    const [formInfo, setFormInfo] = useState("");
    const { flagUpdateMail, setFlagUpdateMail, createInfoContact,
        updateInfoContact } = useContext(BussinesInfoContext);
    // const params = useParams();

    const handelInput = (e) => {
        setFormInfo(e.target.value);
    };

    const close = () => {
        if(contacInfo.length === 0) createInfoContact({ NIT, correo: formInfo,});
        else updateInfoContact({  NIT, correo: formInfo, telefono: contacInfo.telefono,});
        setFlagUpdateMail(!flagUpdateMail); 
    };

    return (
        <div className="divPerro">
            <form className="formAdd">
                <div>
                    <label htmlFor="inputAdd">{}</label>
                    <input id="inputAdd" value={formInfo} onChange={handelInput} />
                    <button className="btnAddGeneric" onClick={close}>AGREGAR CORREO</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateMail;