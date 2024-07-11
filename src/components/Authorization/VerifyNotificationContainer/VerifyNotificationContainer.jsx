import React from "react";
import VerifyNotification from "./VerifyNotification/VerifyNotification";
import { useNavigate } from "react-router-dom";

const VerifyNotificationContainer = () => {
  const navigate = useNavigate();
  const handleConfirmClick = () => {
    navigate("/auth");
  };

  return <VerifyNotification handleConfirmClick={handleConfirmClick} />;
};

export default VerifyNotificationContainer;
