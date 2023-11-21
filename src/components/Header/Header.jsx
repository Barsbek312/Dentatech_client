import React, { useEffect, useState } from "react";
import h from './Header.module.css';
import { slide as Menu } from 'react-burger-menu';
import "./SideBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import notificationsIcon from "./../../assets/images/header__images/notifications.svg";
import exitIcon from "./../../assets/images/header__images/exit.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user";
import logo from "./../../assets/images/header__images/dentatech.svg";


const Header = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const {user, isAuth} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [])

    const handleClickExit = async () => {
        dispatch(logout())
        navigate("/login")
    }

    return (
        <header className={h.header}>
            <div className={`${h.header__container} container`}>
                <div className={h.left}>
                    <Menu width={"178px"} isOpen={isSidebarOpen} >
                        {!isAuth && <NavLink to="/login" className={`first-item`}>Войти</NavLink>}
                        {isAuth && <NavLink to="/profile" className={`${h.profile__item} menu-item`} style={{marginTop: `${isAuth ? "14px !important" : "35px !important"}`}}>Профиль</NavLink>}
                        {isAuth && <NavLink to="/" className={`${h.schedule__item} menu-item`}>Календарь</NavLink>}
                        {isAuth && <NavLink to="/personal" className={`${h.personal__item} menu-item`}>Персонал</NavLink>}
                        {isAuth && <NavLink to="/patients" className={`${h.patients__item} menu-item`}>Пациенты</NavLink>}
                    </Menu>
                    <div className={h.logo__wrapper}>
                        <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
                    </div>
                </div>
                <div className={h.right}>
                    <div className={h.right__item + " " + h.right__person}>
                        <span>
                            {user && (user['surname'] +  " " + user['name'])}
                        </span>
                        {true ? 
                        <div className={h.not_have_ava}>
                        </div>
                        :
                        <div>
                            <img src="" alt="avatar" />
                        </div>
                        }
                    </div>
                    {isAuth && <div className={h.right__item + " " + h.notifications}>
                        <div>
                            <img src={notificationsIcon} alt="" />
                        </div>
                    </div>}
                    {isAuth && <div className={h.right__item + " " + h.right__exit}>
                        <div>
                            <img onClick={handleClickExit} src={exitIcon} alt="" />
                        </div>
                    </div>}
                </div>
            </div>
        </header>
    )
}

export default Header;