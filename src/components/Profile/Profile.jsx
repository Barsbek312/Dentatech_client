import React, { useEffect } from "react";
import pr from "./Profile.module.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";


const Profile = () => {

    const {user, isAuth} = useSelector(state => state.user);

    return (
        <main>
            <div className="container">
                <div className={pr.header}>
                    <h2>
                        Профиль
                    </h2>
                </div>
                <div className={pr.main}>
                    <div className={pr.main__ava_gender}>
                        <div className={pr.ava}>
                            <img src="" alt="ava" />
                        </div>
                        <div className={pr.gender}>
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">ПОЛ</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={user && user['isMale']}
                                >
                                    <FormControlLabel className={pr.radio__item} value={true} control={<Radio />} label="Мужской" />
                                    <FormControlLabel className={pr.radio__item} value={false} control={<Radio />} label="Женский" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div className={pr.main__inputs}>
                        <ul className={pr.inputs__list}>
                            <li>
                                <label htmlFor="">Фамилия</label>
                                <input type="text" name="" id="" value={user && user['surname']} disabled/>
                            </li>
                            <li>
                                <label htmlFor="">Имя</label>
                                <input type="text" name="" id="" value={user && user['name']} disabled/>
                            </li>
                            <li>
                                <label htmlFor="">Отчество</label>
                                <input type="text" name="" id="" disabled/>
                            </li>
                            <li>
                                <div>
                                    <label htmlFor="">EMAIL</label>
                                    <button>Сменить email</button>
                                </div>
                                <input type="text" name="" id="" value={user && user['email']} disabled/>
                            </li>
                            <li>
                                <label htmlFor="">Телефон</label>
                                <input type="text" name="" id="" value={user && user['phone']} disabled/>
                            </li>
                        </ul>
                    </div>
                    <button>Сменить пароль</button>
                </div>
            </div>
        </main>
    )
}

export default compose(WithAuthRedirect)(Profile);