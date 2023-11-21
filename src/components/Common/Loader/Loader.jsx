import React from "react"
import l from './Loader.module.css';
import gear from  "./../../../assets/images/loading__images/gear.svg";
import teeth from "./../../../assets/images/loading__images/teeth.svg";

const Loader = ({loading}) => {
    return (
        <div className={l.loader__wrapper} style={{opacity: `${loading ? "1" : "0"}`, visibility: `${loading ? "visible" : "hidden"}`}}>
            <div className={l.loader__images}>
                <img src={teeth} alt="loading" />
                <img src={gear} className={l.loader__gear} alt="gear spinning" />
            </div>
        </div>
    )
}

export default Loader;
