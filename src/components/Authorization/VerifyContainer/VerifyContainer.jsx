import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUser, verifyEmail } from "../../../redux/user";
import Verify from "./Verify/Verify";

const VerifyContainer = () => {
  const [searchParams] = useSearchParams();
  const link = searchParams.get("token");
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let arr = link.split("?email=");
    setToken(arr[0]);
    setEmail(arr[1]);
  }, []);

  const handleConfirmClick = (token) => async (e) => {
    const res = await dispatch(verifyEmail({ token }));
    if (res?.payload?.status === 201) {
      const user = await dispatch(getUser());
      user?.payload?.status === 200 && navigate("/");
    }
  };


  return <Verify token={token} handleConfirmClick={handleConfirmClick} email={email}/>
};

export default VerifyContainer;
