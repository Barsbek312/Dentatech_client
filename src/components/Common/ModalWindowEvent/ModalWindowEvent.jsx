import React, { useState, useEffect } from "react";
import mwe from './ModalWindowEvent.module.css';
// import { createEvent } from "../../../redux/user";
import { useDispatch, useSelector } from "react-redux";
import { getPatient } from "../../../redux/patient";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import CreatePatient from "../../CreatePatient/CreatePatient";
import { addAdmission, getStatusSchedule } from "../../../redux/schedule";

const ModalWindowEvent = ({ onAddEvent, onClose, selectedDate }) => {

    const dispatch = useDispatch();

    const {register, control, handleSubmit, formState: {errors}} = useForm()

    const {user} = useSelector(state => state.user);
    const {patient} = useSelector(state => state.patient)
    const {statusSchedule} = useSelector(state => state.schedule);

    const [isCreatePatient, setIsCreatePatient] = useState(false);
    const [statusScheduleArr, setStatusScheduleArr] = useState(null);

    const handleFormSubmit = async (data) => {
        const backgroundColorRandom = ['rgba(14, 165, 233, 0.7)', 'rgba(244, 63, 94, 0.8)', 'rgba(109, 40, 217, 0.7)', 'rgba(245, 158, 11, 0.8)'];
        data['isCanceled'] = false;
        data['staffId'] = user.id;
        data['start'] = `${data['date']}T${data['start']}`
        data['end'] = `${data['date']}T${data['end']}`
        data['backgroundColor'] = backgroundColorRandom[Math.floor(Math.random() * backgroundColorRandom.length)];
        delete data['date']
        const res = await dispatch(addAdmission(data));
        console.log(res);
        onClose();
    };

    useEffect(() => {
        const fetchPatientStatus = async (user) => {
            if(user && user.branchId) {
                const patient = await dispatch(getPatient(user.branchId))
                const statusSchedule = await dispatch(getStatusSchedule());
            }
        }

        fetchPatientStatus(user);
    }, [])

    const onClickCreatePatient = (event) => {
        setIsCreatePatient(true);
    }

    const onCloseCreatePatient = () => {
        setIsCreatePatient(false);
    }

    return (
        <>
            {isCreatePatient ? <CreatePatient onClose={onCloseCreatePatient} /> : <div className={mwe.modal_overlay} onClick={onClose}>
            <div className={mwe.modal_content} onClick={(e) => e.stopPropagation()}>
                <h2>Create Event</h2>
                <div>
                    <div className={mwe.patient__wrapper}>
                        <FormControl size="small" fullWidth error={errors['patientId']}>
                            <InputLabel id={mwe.patient__label}>
                                Пациент
                            </InputLabel>
                            <Controller 
                                name="patientId"
                                control={control}
                                rules={{ required: "Пациент является обязательным полем" }}
                                render={({field, fieldState: {error}}) => (
                                    <Select
                                        {...field}
                                        labelId={mwe.patient__label}
                                        label={error ? error.message : "Пациент"}>
                                        <MenuItem key={0} value={"Создать"} onClick={onClickCreatePatient}>Создать</MenuItem>
                                        {patient && patient.map(item => (
                                            <MenuItem key={item.id} value={item.id}>{item.surname} {item.name}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </div>
                    <div className={mwe.statusSchedule__wrapper}>
                        <FormControl size="small" fullWidth error={errors['statusId']}>
                            <InputLabel id={mwe.status_schedule_label}>
                                Статус
                            </InputLabel>
                            <Controller 
                                name="statusId"
                                control={control}
                                rules={{ required: "Статус является обязательным полем" }}
                                render={({field, fieldState: {error}}) => (
                                    <Select
                                        {...field}
                                        label={error ? error.message : "Статус"}
                                        labelId={mwe.status_schedule_label}
                                    >
                                        {statusSchedule && statusSchedule.map(item => (
                                            <MenuItem key={item.id} value={item.id}>{item.status}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <label>Title:</label>
                        <input
                            {...register("title")}
                            type="text"
                        />
                    </div>
                    <div>
                        <label>Date:</label>
                        <input
                            {...register("date", {
                                required: "Дата является обязательным полем"
                            })}
                            type="date"
                            style={{ borderColor: errors["date"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                        />
                    </div>
                    <div>
                        <label>Start Time:</label>
                        <input
                            {...register("start", {
                                required: "Начало является обязательным полем"
                            })}
                            type="time"
                            style={{ borderColor: errors["start"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                        />
                    </div>
                    <div>
                        <label>End Time:</label>
                        <input
                            {...register("end", {
                                required: "Конец является обязательным полем"
                            })}
                            type="time"
                            style={{ borderColor: errors["end"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                        />
                    </div>

                    <div>
                        <label>Description:</label>
                        <textarea
                            style={{resize: "none"}} 
                            {...register("description")}
                        />
                    </div>
                </div>
                <button onClick={handleSubmit(handleFormSubmit)}>Create</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>}
        </>
    )
}

export default ModalWindowEvent;