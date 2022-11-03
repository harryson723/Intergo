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

const initialInfoType = {
    student: "CODIGO DEL ESTUDIANTE: ",
    bussiness: "NIT DE LA EMPRESA: "
};

const LoginForm = () => {

    const [formInfo, setFormInfo] = useState(initialForm);
    const [infoType, setInfoType] = useState(initialInfoType.student);
    const {  isLoading, setIsLoading, setIsStudent } = useContext(UserContext);
    const navigate = useNavigate();

    const handleInput = e => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "userType") {
            if (formInfo.userType !== "estudiante") setInfoType(initialInfoType.student);
            else setInfoType(initialInfoType.bussiness);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (formInfo.userType === "estudiante") {
            setIsLoading(true);
            let url = `http://localhost:3500/students/getStudent/${formInfo.user}`;
            helpHttp().get(url).then(res => {
                if (res.error) {
                    return res.error
                } else {
                    if (res.length > 0) {
                        setIsLoading(false);
                        if (res[0].contrasena === formInfo.pass) {
                            setIsStudent(true);
                            navigate(`spaceMain/studentSpace/main/${formInfo.user}`);
                        }
                        else alert("error al validar la informacion");
                    } else alert('El usuario no existe');
                }
                setIsLoading(false);
            });
        } else {
            setIsLoading(true);
            let url = `http://localhost:3500/bussines/getBussines/${formInfo.user}`;
            helpHttp().get(url).then(res => {
                if (res.error) {
                    console.log(res.error);
                } else {
                    if (res.length > 0) {
                        if (res[0].contrasena === formInfo.pass) {
                            navigate(`spaceMain/bussinesSpace/main/${formInfo.user}`);
                        }
                        else alert("error al validar la informacion");
                    } else alert('El usuario no existe');
                }
                setIsLoading(false);
            });
        }

    };
    return (
        <div className="conteiner">
            <div className="conteinerThings">
                {isLoading && <Loader />}
                <img src="/img/logo.png" alt="Logo de la udec" />
                <form className="loginForm">
                    <label htmlFor="user">{infoType}</label>
                    <input id="user" name="user" value={formInfo.user} onChange={handleInput} />
                    <label htmlFor="pass">CONTRASEÑA: </label>
                    <input id="pass" name="pass" value={formInfo.pass} onChange={handleInput} />
                    <select name="userType" onChange={handleInput}>
                        <option value="estudiante">ESTUDIANTE</option>
                        <option value="empresa">EMPRESA</option>
                    </select>
                    <div className="conteinerButton">
                        <div>
                            <Link className="linkButton" to="/">¿OLVIDO CONTRASEÑA?</Link>
                            <input type="submit" onClick={handleSubmit} value="INICIAR SESION" />

                        </div>
                        <div>
                            <Link className="linkButton" to="signinStudnent">REGISTRO ESTUDIANTE</Link>
                            <Link className="linkButton" to="signinBusiness">REGISTRO EMPRESA</Link>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default LoginForm;