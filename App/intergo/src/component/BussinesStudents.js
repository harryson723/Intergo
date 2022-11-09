import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import getRequest from "../helper/getRequest";
import useGetInfo from "../hooks/useGetInfo";
import Loader from "./Loader";
import StudentAplicated from "./StudentAplicated";

const BussinesStudents = () => {
    const { isLoading, setIsLoading } = useContext(UserContext);
    const params = useParams();
    const [bussinesStudent, setBussinesStudent] = useState([]);

    useEffect(() => {
        getRequest(`http://localhost:3500/students/getStudentBussines/${params.NIT}`, setIsLoading, setBussinesStudent);
    }, []);
    return (
        <div className="divBussinesStudent">
            {isLoading && <Loader></Loader>}
            {bussinesStudent.length > 0 || !Array.isArray(bussinesStudent) ?
                !Array.isArray(bussinesStudent) ?
                    <StudentAplicated e={bussinesStudent} NIT={params.NIT} 
                     key={bussinesStudent.idEstudiante} />
                    :
                    bussinesStudent.map(e => <StudentAplicated e={e} NIT={params.NIT} 
                         key={e.idEstudiante}/>)

                : <p>No hay vacantes</p>}
        </div>
    );
}

export default BussinesStudents;