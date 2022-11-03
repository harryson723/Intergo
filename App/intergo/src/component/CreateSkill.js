import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import StudentInfoContext from "../context/StudentInfoContext";
import "../styles/formAdd.scss";

const CreateSkill = ({ text }) => {

    const [formInfo, setFormInfo] = useState("");
    const { setFormSkills,  createSkill, setupdateFlagSkill, updateFlagSkill } = useContext(StudentInfoContext);
    const params = useParams();

    const handelInput = (e) => {
        setFormInfo(e.target.value);
    };

    const close = () => {
        createSkill({ formInfo, idUser: params.idUser });
        setFormSkills(false);
        setupdateFlagSkill(!updateFlagSkill);
       
    };

    return (
        <div className="divPerro">
            <form className="formAdd">
                <div>
                    <label htmlFor="inputAdd">{text}</label>
                    <input id="inputAdd" value={formInfo} onChange={handelInput} />
                    <button className="btnAddGeneric" onClick={close}>AGREGAR</button>
                </div>
            </form>
        </div>
    );
}

export default CreateSkill;