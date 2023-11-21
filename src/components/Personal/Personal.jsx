import React, { useEffect, useRef, useState } from "react";
import p from "./Personal.module.css";
// import searchIcon from './../../assets/images/personal__images/search.svg';
import { useForm } from "react-hook-form";
import copy from './../../assets/images/personal__images/copy.svg';
import trash from "./../../assets/images/personal__images/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { createUser, getPersonal } from "../../redux/user";
import Notification from "../Common/Notification/Notification";

const Personal = () => {

    const [inputValue, setInputValue] = useState("");
    const {user} = useSelector(state => state.user);
    const [personalList, setPersonalList] = useState([])
    const [counter, setCounter] = useState(0);
    // const [listOfPersonalBlocks, setListOfPersonalBlocks] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getPersonal());
        }

        fetchData();
    }, [])

    useEffect(() => {
        if(user && user.personal && counter === 0) {
            setCounter(prevCounter => prevCounter+=1)
            const events = user.personal;
            let personal = []
            for(let i in events) {
                personal.push(events[i].name + " " + events[i].surname);
            }

            setPersonalList(personal)
        }
    }, [user])

    const [isShow, setIsShow] = useState(false);
    const [isClickcBehindModalWindow, setIsClickcBehindModalWindow] = useState(false);
    const [isActiveIndex, setIsActiveIndex] = useState(0)
    const wrapperOfModalWindow = useRef(null);
    const modalWindow = useRef(null);

    const [isCreatedUser, setIsCreatedUser] = useState(false);
    const [isCreateWrong, setIsCreatedWrong] = useState(false);

    const [phoneNumber, setPhoneNUmber] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmitAddPersonal = async (data, event) => {
        event.preventDefault();
        data['phoneNumber'] = phoneNumber; 
        data['password'] = data['surname'] + "_" + data['name'] + (Math.floor(Math.random() * (9999 - 1000)) + 1000);
        data['status'] = 'personal';

        try {
            const res = await dispatch(createUser(data));
            if(res.type === "user/register/fulfilled") {
                setIsCreatedWrong(false);
                setTimeout(() => {
                    setIsCreatedUser(true);
                }, 300)
                console.log(isCreatedUser)
                setTimeout(() => {
                    setIsCreatedUser(false);
                }, 2000)
            }
        } catch(err) {
            setIsCreatedWrong(true)
        }
        setIsShow(false);
    }

    const handleClickContainer = () => {
        setIsShow(false);
    }

    const handleClickModal = (e) => {
        e.stopPropagation();
    }

    const renderPesonal = (listOfPersonal) => {
        const filtredItems = listOfPersonal.filter((item) =>
            item.toLowerCase().includes(inputValue.toLowerCase())
        )

        return (filtredItems.map(item => {
            return (
                <li className={p.personal__item}>
                    <div>
                        <div className={p.item__image_wrapper}><img src="" alt="" /></div>
                        <div className={p.item__text_wrapper}>
                            <h3>{item}</h3>
                        </div>
                        <div className={p.item__job_title}>
                            <span>
                                Ст. Стоматолог
                            </span>
                        </div>
                        {/* <div className={p.item__job_title}>
                            <span>
                                Приглашен
                            </span>
                        </div> */}
                    </div>
                    <div>
                        <button><img src={copy} alt="copy" /></button>
                        <button><img src={trash} alt="delete" /></button>
                    </div>
                </li>
            )
        }))
    }

    return (
        <main>
            <div className="container">
                <Notification isError={isCreateWrong} isShow={isCreatedUser} Text={isCreateWrong ? "Приглашение отправить не удалось" : "Приглашение отправлено"}/>
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
                                    id="input__email" />
                            </div>

                            <label htmlFor="input__phone">Номер телефона:</label>
                            <div className={p.phone__icon}>
                                <PhoneInput
                                    id="field__phone"
                                    country={'kg'}
                                    value={phoneNumber}
                                    onChange={(phone) => { setPhoneNUmber(phone) }}
                                />
                            </div>

                            <button type="submit">Пригласить</button>

                        </form>
                    </div>
                </div>
                <div className={p.header}>
                    <h2>Персонал</h2>
                    <div><input type="text" placeholder="Поиск" onChange={(e) => { setInputValue(e.target.value) }} value={inputValue} /></div>
                    <button onClick={() => { setIsShow(true) }}>Добавить персонал</button>
                </div>
                <div className={p.main}>
                    <header>
                        <ul>
                            {["Все", "Подтвержденные", "В ожидании", "Отмененные"].map((item, index) => {
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
                            <li>Должность</li>
                            <li>Статус</li>
                        </ul>
                        {renderPesonal(personalList)}
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default Personal;