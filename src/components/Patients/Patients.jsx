import React, { useRef, useState, useEffect } from "react";
import p from "./Patients.module.css";
// import searchIcon from './../../assets/images/personal__images/search.svg';
import { useForm } from "react-hook-form";
import copy from './../../assets/images/personal__images/copy.svg';
import trash from "./../../assets/images/personal__images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../Common/Notification/Notification";
import { deleteEvent } from "../../redux/user";

const Patients = () => {

    const [inputValue, setInputValue] = useState("");
    const [personalList, setPersonalList] = useState([])
    const [counter, setCounter] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const [isActiveIndex, setIsActiveIndex] = useState(0)
    const [isClickedOnRequest, setIsClickedOnRequest] = useState({
        check: false,
    }); 
    const {user} = useSelector(state => state.user);
    const wrapperOfModalWindow = useRef(null);
    const modalWindow = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if(user && user.events && counter === 0) {

            setCounter(prevCounter => prevCounter+=1)

            const events = user.events;
            let personal = []

            for(let i in events) {
                personal.push({
                    "id": events[i].id,
                    'name': events[i].pacient,
                    "age": events[i].agePacient,
                    "status": (events[i].status !== "waiting" && events[i].status !== "cancelled") ? 3 : events[i].status === "waiting" ? 1 : 2
                })
            }

            setPersonalList(personal)
        }
    }, [user])
    // const [listOfPersonalBlocks, setListOfPersonalBlocks] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmitAddPersonal = (data, event) => {
        event.preventDefault();
        console.log(data);
    }

    const handleClickContainer = () => {
        setIsShow(false);
    }

    const handleClickModal = (e) => {
        e.stopPropagation();
    }

    const copyPatient = async (namePatient) => {
        try {
            await navigator.clipboard.writeText(namePatient);
            setIsClickedOnRequest({
                check: true,
                isError: false,
            });
        } catch(err) {
            console.error("Ошибка при копировании ", err)
            setIsClickedOnRequest({
                check: true,
                isError: true,
            });
        }
    }

    useEffect(() => {
        if(isClickedOnRequest) {
            setTimeout(() => {
                setIsClickedOnRequest(false);
            }, 2000)
        }
    }, [isClickedOnRequest])

    const onDeletePatient = async (eventId) => {
        await dispatch(deleteEvent)   
    }

    const renderPesonal = (listOfPersonal) => {
        const filtredItems = listOfPersonal.filter((item) =>
            (item["status"] === isActiveIndex || isActiveIndex === 0) && (item['name'].toLowerCase().includes(inputValue.toLowerCase()) || item['age'].includes(inputValue))
        )

        return (filtredItems.map(item => {
            return (
                <li className={p.personal__item}>
                    <div>
                        <div className={p.item__image_wrapper}><img src="" alt="" /></div>
                        <div className={p.item__text_wrapper}>
                            <h3>{item['name']}</h3>
                        </div>
                        <div className={p.item__job_title}>
                            <span>
                                {item['age']}
                            </span>
                        </div>
                    </div>
                    <div>
                        <button title="Скопировать имя пацента"><img src={copy} alt="copy" onClick={() => {copyPatient(item['name'])}}/></button>
                        <button title="Удалить пациента" onClick={() => {onDeletePatient(item.id)}}><img src={trash} alt="delete" /></button>
                    </div>
                </li>
            )
        }))
    }

    return (
        <main>
            {<Notification isError={isClickedOnRequest?.isError} Text="Текст успешно скопирован" isShow={isClickedOnRequest?.check}/>}
            <div className="container">
                <div className={p.add__personal_wrapper} style={{ display: isShow ? "flex" : "none" }} ref={wrapperOfModalWindow} onClick={handleClickContainer}>
                    <div className={p.add__personal} ref={modalWindow} onClick={handleClickModal}>
                        <form onSubmit={handleSubmit(onSubmitAddPersonal)}>

                            <label htmlFor="input__name">Имя</label>
                            <div className={p.name__icon}>
                                <input {...register("name", {
                                    required: "Имя является обязательным полем"
                                })}
                                    type="text"
                                    placeholder={errors['name'] ? errors['name'].message : "Имя"}
                                    style={{ borderColor: errors["name"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                                    id="input__name" />
                            </div>

                            <label htmlFor="input__surname">Фамилия</label>
                            <div className={p.surname__icon}>
                                <input {...register("surname", {
                                    required: "Фамилия является обязательным полем"
                                })}
                                    type="text"
                                    placeholder={errors['surname'] ? errors['surname'].message : "Фамилия"}
                                    style={{ borderColor: errors["surname"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                                    id="input__surname" />
                            </div>

                            <label htmlFor="input__email">Почта</label>
                            <div className={p.email__icon}>
                                <input {...register("email", {
                                    required: "Почта является обязательным полем",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Please enter a valid email address",
                                    },
                                })}
                                    type="text"
                                    placeholder={errors['email'] ? errors['email'].message : "Почта"}
                                    style={{ borderColor: errors["email"] ? "red" : "rgba(196, 196, 196, 0.50)" }}
                                    id="input__surname" />
                            </div>

                            <button type="submit">Пригласить</button>

                        </form>
                    </div>
                </div>
                <div className={p.header}>
                    <h2>Пациенты</h2>
                    <div><input type="text" placeholder="Поиск" onChange={(e) => { setInputValue(e.target.value) }} value={inputValue} /></div>
                </div>
                <div className={p.main}>
                    <header>
                        <ul>
                            {["Все", "В ожидании", "Отмененные"].map((item, index) => {
                                return (
                                    <li
                                        onClick={() => setIsActiveIndex(index)}
                                        key={index}
                                        className={`${isActiveIndex === index ? p.active : ""}`}>
                                        {item}
                                    </li>
                                )
                            })}
                        </ul>
                    </header>
                    <ul className={p.list__of_personal}>
                        <ul className={p.list__of_title}>
                            <li>Фамилия Имя/Номер телефона</li>
                            <li>Возраст</li>
                        </ul>
                        {renderPesonal(personalList)}
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default Patients;