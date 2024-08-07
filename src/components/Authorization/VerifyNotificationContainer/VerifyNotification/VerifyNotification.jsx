import React from "react";
import vn from './VerifyNotification.module.css';

const VerifyNotification = ({handleConfirmClick}) => {
    return (
        <main className={vn.verify__main}>
            <div>
                <h2 className={vn.verify__title}>Подтвердите адрес электронной почты</h2>
                <p className={vn.verify__email}>Ссылка на подтверждение отправлено на вашу почту</p>
                <button 
                    onClick={handleConfirmClick}
                    className={vn.verify__button}
                >
                    Назад
                </button>
            </div>
        </main>
    )
}

export default VerifyNotification;