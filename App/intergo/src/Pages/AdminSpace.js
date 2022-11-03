import { useParams } from "react-router-dom";
import SpaceMain from "../component/SpaceMain";

const backGrounds = ["./img/backUser.png", "./img/backUser2.jpg ", "./img/backUser.png"];


const BussinesSpace = ({ SpaceSection }) => {

    const itemMenu = [
        {
            back: "fa-solid fa-house-user",
            url: `../main`,
        },
    ];
    return (
        <SpaceMain itemMenu={itemMenu} backGrounds={backGrounds} SpaceSection={SpaceSection} />
    );
}

export default BussinesSpace;