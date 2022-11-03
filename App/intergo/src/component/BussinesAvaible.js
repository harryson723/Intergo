import { useContext } from "react";
import UserContext from "../context/UserContext";
import useGetInfo from "../hooks/useGetInfo";
import Loader from "./Loader";
import "../styles/bussinesStuden.scss";
import { NavLink, useParams } from "react-router-dom";
import BussinesState from "./BussinesState";



const BussinesAvaible = ({ admin }) => {
    const { isLoading , setIsLoading} = useContext(UserContext);
    const params = useParams();
    const { info: bussinesInfo } = useGetInfo(`http://localhost:3500/bussines/getBussiness/`, setIsLoading);
    return ( 
        <div className="divBussinesStudent"> 
            {isLoading && <Loader></Loader>}
            {bussinesInfo.map(b => <div className="BussinesStudent" key={b.NIT}>
                <p><b>EMPRESA: </b> {b.nombreEmpresa}</p>
                <p><b>SECTOR: </b>{b.sectorEmpresa}</p>
                <p><b>DESCRIPCION: </b>{b.descripcion}</p>
                {!admin && <NavLink to={`../bussines/${params.idUser}/${b.NIT}`}>VER</NavLink>}
                {admin && <BussinesState b={b}/>}
            </div>)}
        </div>
     );
}
 
export default BussinesAvaible;