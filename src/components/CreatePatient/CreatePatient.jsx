import { useEffect, useState } from 'react'
import cp from './CreatePatient.module.css'
import "./CreatePatient.css";
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { createPatient, getDistrict } from '../../redux/patient';
import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import Notification from '../Common/Notification/Notification';

const CreatePatient = ({ onClose }) => {

    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const {district} = useSelector(state => state.patient);
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isShowErrorSubmit, setIsShowErrorSubmit] = useState(false);
    const [textError, setTextError] = useState("");

    useEffect(() => {
        const fetchDistrict = async () => {
            const res = await dispatch(getDistrict());
        }

        fetchDistrict();
    }, [])

    const handleFormSubmit = async (data) => {
        if(user && user.branchId) {
            data['branchId'] = user.branchId;
            data['Age'] = Number(data["Age"]);
            const res = await dispatch(createPatient(data))
            onClose();
        } else {
            setTextError("Вышла ошибка: попробуйте позже")
            setIsShowErrorSubmit(true);
        }
    }

    useEffect(() => {
        if(isShowErrorSubmit) {
            setTimeout(() => {
                setIsShowErrorSubmit(false);
            }, 2000)    
        }
    }, [isShowErrorSubmit])

    return (
        <div className={cp.modal_overlay} onClick={onClose}>
            <Notification isShow={isShowErrorSubmit} Text={textError} isError={true}/>
            <div className={cp.modal_content} onClick={(e) => e.stopPropagation()}>
                <h2>Добавить пациента</h2>
                <div>
                    <div>
                        <label>Имя Пациента:</label>
                        <input
                            {...register("name")}
                            type="text"
                        />
                    </div>
                    <div>
                        <label>Фамилия Пациента:</label>
                        <input
                            {...register("surname")}
                            type="text"
                        />
                    </div>
                    <div>
                        <label>Возраст:</label>
                        <input
                            {...register("Age")}
                            type="number"
                        />
                    </div>
                    <div>
                        <label htmlFor="">Почта</label>
                        <input {...register("email", {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please enter a valid email address",
                            },
                        })}
                            placeholder={errors['email'] ? errors['email'].message : "Почта"}
                            style={{ borderColor: errors["email"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                            type="text"
                        />
                    </div>
                    <div className={cp.phone__input}>
                        <label htmlFor="field__phone">Телефон</label>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue={""}
                            render={({ field, fieldState: { error } }) => (
                                <PhoneInput
                                    {...field}
                                    id="field__phone"
                                    country={'kg'}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <FormControl size="small" fullWidth error={errors['districtId']}>
                            <InputLabel id={cp.district__label}>
                                Район
                            </InputLabel>
                            <Controller
                                name="districtId"
                                control={control}
                                defaultValue={"Район"}
                                rules={{ required: "Район является обязательным полем" }}
                                render={({ field, fieldState: { error } }) => (
                                    <Select
                                        {...field}
                                        labelId={cp.district__label}
                                        label={error ? error.message : "Пациент"}>
                                        {district && district.map(item => (
                                            <MenuItem key={item.id} value={item.id}>{item.district}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </div>
                </div>
                <button onClick={handleSubmit(handleFormSubmit)}>Create</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    )
}

export default CreatePatient