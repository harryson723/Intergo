import { useState } from 'react';
import { NavLink } from "react-router-dom";
import "../styles/spaceMain.scss";


const SpaceMain = ({ itemMenu, backGrounds, SpaceSection }) => {
    const [currentBackground, setCurrentBackground] = useState(backGrounds[0]);

    const changeBackground = e => {
        setCurrentBackground(backGrounds[e.target.parentElement.name]);
    };
   
    return (
        <div className="spaceMain grid-1-2" >
            <img src={currentBackground} className='imgBack'/>
            <div className="menu">
                {itemMenu.map((item, index) => <NavLink key={index} name={index} onClick={changeBackground}
                to={item.url} className={({ isActive }) => isActive ? 'activeNav' : ''}><i className={item.back} key={index}></i></NavLink>)}
            </div>
            <div className="spaceSection">
                {SpaceSection && <SpaceSection />}
            </div>
        </div>
    );
}

export default SpaceMain;