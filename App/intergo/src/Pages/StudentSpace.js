import { useParams } from "react-router-dom";
import SpaceMain from "../component/SpaceMain"


const backGrounds = ["./img/backUser.png", "./img/backUser2.jpg ", "./img/backUser.png"];


const StudentSpace = ({ SpaceSection }) => {
    
    const params = useParams();
    const itemMenu = [
        {
            back: "fa-solid fa-house-user",
            url: `../main/${params.idUser}`,
        },
        {
            back: "fa-solid fa-circle-user",
            url: `../info/${params.idUser}`,
        },
        {
            back: "fa-solid fa-briefcase",
            url: `../bussiness/${params.idUser}`,
        },
        {
            back: "fa-solid fa-circle-arrow-left loguot",
            url: `/`,
        },
    ];
    return (
        <SpaceMain itemMenu={itemMenu} backGrounds={backGrounds} SpaceSection={SpaceSection} />
    );
}

export default StudentSpace;