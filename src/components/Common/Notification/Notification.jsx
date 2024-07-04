import React, { useEffect } from "react";
import n from "./Notification.module.css";
import success from "./../../../assets/images/notification__images/success.svg";
import error from "./../../../assets/images/notification__images/error.svg";

const Notification = ({
  isError = false,
  Text = "Успешно!",
  isShow = false,
}) => {
  return (
    <div
      className={`${n.notification__wrapper} ${
        isError === true ? n.error : n.success
      }`}
      style={{ bottom: `${isShow ? "15px" : "-150px"}` }}
    >
      <img src={isError ? error : success} alt="notification_img" />
      <span>{Text}</span>
    </div>
  );
};

export default Notification;
