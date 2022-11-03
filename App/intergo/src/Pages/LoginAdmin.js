import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../component/Loader';
import UserContext from '../context/UserContext';
import { helpHttp } from '../helper/helpHttp';
import "../styles/styleForm.scss";

const initialForm = {
    user: "",
    pass: "",
    userType: "estudiante",
};


const LoginAdmin = () => {

    const [formInfo, setFormInfo] = useState(initialForm);
    const { isLoading, setIsLoading, setIsStudent } = useContext(UserContext);
    const navigate = useNavigate();


    const handleInput = e => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(formInfo.pass === "" && formInfo.user === "") {
            navigate("../main");
        }
        
    };
    return (
        <div className="conteiner">
            <div className="conteinerThings">
                {isLoading && <Loader />}
                <img src="/img/logo.png" alt="Logo de la udec" />
                <form className="loginForm">
                    <label htmlFor="user">ADMIN</label>
                    <input id="user" name="user" value={formInfo.user} onChange={handleInput} />
                    <label htmlFor="pass">CONTRASEÑA: </label>
                    <input id="pass" name="pass" value={formInfo.pass} onChange={handleInput} />
                    <div className="conteinerButton">
                        <div>
                            <input type="submit" onClick={handleSubmit} value="INICIAR SESION" />
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default LoginAdmin;