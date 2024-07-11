import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/user";
import Header from "./Header/Header";

const HeaderContainer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user, isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickExit = async () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleClickCloseSideBar = () => {
    setIsSidebarOpen(false);
  };

  return <Header 
    isSidebarOpen={isSidebarOpen}
    setIsSidebarOpen={setIsSidebarOpen}
    handleClickCloseSideBar={handleClickCloseSideBar}
    isAuth={isAuth}
    handleClickExit={handleClickExit}
    user={user}
  />
};

export default HeaderContainer;
