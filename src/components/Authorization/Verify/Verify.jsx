import React, { useEffect, useState } from "react";
import v from './Verify.module.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser, verifyEmail } from "../../../redux/user";

const Verify = () => {
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
    }, [])


    const handleConfirmClick = async (token) => {
        // Здесь вы можете добавить логику подтверждения почты
        
        const res = await dispatch(verifyEmail({token}));
        console.log(res);
        if(res?.payload?.status === 201) {
            const user = await dispatch(getUser());
            user?.payload?.status === 200 && navigate('/');
        } 

    };

    return (
        <main className={v.verify__main}>
            <div>
                <h2 className={v.verify__title}>Подтвердите адрес электронной почты</h2>
                <p className={v.verify__email}>{email}</p>
                <button 
                    onClick={() => {handleConfirmClick(token)}}
                    className={v.verify__button}
                >
                    Подтвердить
                </button>
            </div>
        </main>
    )
}

export default Verify;
