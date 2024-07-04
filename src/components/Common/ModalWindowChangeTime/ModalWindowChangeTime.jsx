import React from "react";
import mwct from './ModalWindowChangeTime.module.css';
import { useForm } from "react-hook-form";

const ModalWindowChangeTime = ({confirmHandler, cancelHandler}) => {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const handleSubmitForm = (data) => {
        confirmHandler(data.start, data.end);
    }

    return (
        <div className={mwct.modal_overlay} onClick={cancelHandler}>
            <div className={mwct.modal_content} onClick={(e) => e.stopPropagation()}>
                <h2>Время:</h2>
                <div>
                    <label>Start Time:</label>
                    <input
                        {...register("start", {
                            required: "Начало является обязательным полем"
                        })}
                        type="time"
                        style={{borderColor: errors['start'] ? "red" : "rgba(196, 196, 196, 0.50)"}}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="time"
                        {...register("end", {
                            required: "Конец является обязательным полем"
                        })}
                        style={{borderColor: errors['end'] ? "red" : "rgba(196, 196, 196, 0.50)"}}
                    />
                </div>
                <button onClick={handleSubmit(handleSubmitForm)}>Change</button>
                <button onClick={cancelHandler}>Cancel</button>
            </div>
        </div>
    )
}

export default ModalWindowChangeTime;