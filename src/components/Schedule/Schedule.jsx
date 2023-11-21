import s from "./Schedule.module.css";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useState, useEffect } from "react";
import './Shedule.css';
import ModalWindowEvent from "../Common/ModalWindowEvent/ModalWindowEvent";
import { createEvent, cancelEvent, updateEvent } from "../../redux/user";
import ModalWindowDescriptionEvent from './../Common/ModalWindowDescriptionEvent/ModalWindowDescriptionEvent';
import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import listPlugin from '@fullcalendar/list';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getScheduleAndPatients } from "../../redux/schedule";



const Schedule = () => {

    const colors = ["#F35774", "#00BA34", "#52BDF0", "#8B5CF6", "#F4AA2C"];

    const dispatch = useDispatch();

    const [counterForTableOfPatients, setCounterForTableOfPatients] = useState(0);
    const { user, isAuth, loadingUser } = useSelector(state => state.user);
    const {schedule} = useSelector(state => state.schedule)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
    const [currentCategoryPatient, setCurrentCategoryPatient] = useState("All");
    const [appointments, setAppointments] = useState({});
    const [showAppointmentsTable, setShowAppointmentsTable] = useState([]);
    const [showAppointmentsCalendar, setShowAppointmentsCalendar] = useState([]);

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const onCloseModalWindow = () => {
        setIsModalOpen(false);
    };

    const transformAppointmentsToEvents = (appointments, view) => {
        let events = [];
        for (let category in appointments) {
            events = [
                ...events,
                ...appointments[category].map(appointment => ({
                    title: appointment.title,
                    start: view === "dayGridMonth" ? new Date(appointment.start).toISOString().split('T')[0] : appointment.start,
                    end: view === "dayGridMonth" ? new Date(appointment.end).toISOString().split('T')[0] : appointment.end,
                    description: appointment.description,
                    backgroundColor: appointment.backgroundColor,
                    borderColor: appointment.backgroundColor,
                    extendedProps: {
                        patient: appointment.patient,
                        patientId: appointment.patientId,
                        staffId: appointment.staffId,
                        statusId: appointment.statusId
                    },
                    textColor: 'white'
                }))
            ];
        }
        return events;
    };

    const addEvent = async (event) => {
        event['backgroundColor'] = getRandomColor();
        event['status'] = (new Date(event.start) <= new Date() && new Date() <= new Date(event.end)) ? "active" : new Date(event.start) > new Date() ? "waiting" : "past";
        await dispatch(createEvent(event));
        setIsModalOpen(false);
    };

    const onDeleteEvent = async () => {
        if (selectedEvent && selectedEvent.id) {
            const updatedEventData = { ...selectedEvent, status: 'cancelled' };
            await dispatch(updateEvent(updatedEventData));
            setDescriptionModalOpen(false);
        }
    };


    const onChangeEvent = async (updatedEventData) => {
        if (selectedEvent && selectedEvent.id) {
            updatedEventData['status'] = (new Date(updatedEventData.start) <= new Date() && new Date <= new Date(updatedEventData.end)) ? "active" : new Date(updatedEventData.start) > new Date() ? "waiting" : "past";
            await dispatch(updateEvent({ ...updatedEventData, id: selectedEvent.id }));
            setDescriptionModalOpen(false);
        }
    }


    const handleClickDay = (info) => {
        setSelectedDate(info.dateStr);  // Записываем выбранную дату
        setIsModalOpen(prev => !prev);
    };

    const handleEventClick = (info) => {

        const newSelectedEvent = {
            id: info.event.id,
            patient: info.event.extendedProps?.pacient,
            agePacient: info.event.extendedProps?.agePacient,
            title: info.event.title,
            start: info.event.start,
            end: info.event.end,
            description: info.event.extendedProps?.description,
            fullStartTime: info.event.extendedProps?.fullStartTime,
            fullEndTime: info.event.extendedProps?.fullEndTime,
            status: info.event.extendedProps?.status,
        };



        setSelectedEvent(newSelectedEvent);
        setDescriptionModalOpen(true);
    };

    const handleEventDrop = (info) => {
        const { event } = info;
        const updatedStart = event.start;
        const updatedEnd = event.end;
    
        // Здесь можно вызвать функцию для обновления события в вашем состоянии или базе данных
        // Например, updateEventInYourStateOrDatabase(event.id, updatedStart, updatedEnd);
    };


    let handleViewDidMount = (info) => {
        if (appointments) {
            const events = transformAppointmentsToEvents(appointments, info.view.type);
            setShowAppointmentsCalendar(events);
        }
    };

    useEffect(() => {
        const fetchSchedule = async (staffId) => {
            const res = await dispatch(getScheduleAndPatients(staffId));
        }
        if(isAuth && !loadingUser) {
            fetchSchedule(user.id);
        }
    }, [isAuth, loadingUser])

    const formatTime = (timeString) => {
        return timeString.substring(0, 5);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    const renderEventContent = (eventInfo) => {
        const startTime = new Date(eventInfo.event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const endTime = new Date(eventInfo.event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return {
            html: `<span>${startTime} - ${endTime} <br>${eventInfo.event.extendedProps.patient && eventInfo.event.extendedProps.patient.name}</span>`
        }
    }

    useEffect(() => {
        if(schedule) {
            const now = new Date();

            let appointmentsCurrent = {
                pastAppointments: [],
                activeAppointments: [],
                waitingAppointments: [],
                canceledAppointments: []
            }

            schedule.forEach(item => {
                const start = new Date(item.start);
                const end = new Date(item.end);

                if (end < now) {
                    appointmentsCurrent.pastAppointments.push(item)
                } else if (start <= now && now <= end) {
                    appointmentsCurrent.activeAppointments.push(item)
                } else if (start > now) {
                    appointmentsCurrent.waitingAppointments.push(item)
                } else if (item.isCanceled) {
                    appointmentsCurrent.canceledAppointments.push(item)
                }
            })

            setAppointments(appointmentsCurrent);
        }   
    }, [schedule, currentCategoryPatient])


    useEffect(() => {
        if(appointments) {
            if(currentCategoryPatient === "All") {
                let currentShowAppointmentsTable = [];
                let currentShowAppointmentsCalendar = [];
                for(let i in appointments) {
                    const arrOfAppointments = appointments[i].map((item) => {
                        setCounterForTableOfPatients(counterForTableOfPatients+1);
                        return(
                            <div className={s.patient__wrapper}>
                                <strong>{counterForTableOfPatients}</strong><span className={s.patient}>{item.patient && item.patient.name} {item.patient && item.patient.surname}</span>
                            </div>
                        )
                    })
                    const arrOfAppointmentsCalendar = appointments[i].map(appointment => ({
                        title: appointment.title,
                        start: new Date(appointment.start).toISOString().split('T')[0],
                        end: new Date(appointment.end).toISOString().split('T')[0],
                        backgroundColor: appointment.backgroundColor,
                        borderColor: appointment.backgroundColor,
                        description: appointment.description,
                        extendedProps: {
                            patient: appointment.patient,
                            patientId: appointment.patientId,
                            staffId: appointment.staffId,
                            statusId: appointment.statusId
                        }
                    }))
                    currentShowAppointmentsTable = [...currentShowAppointmentsTable, ...arrOfAppointments];
                    currentShowAppointmentsCalendar = [...currentShowAppointmentsCalendar, ...arrOfAppointmentsCalendar];
                }
                setShowAppointmentsTable(currentShowAppointmentsTable);
                setShowAppointmentsCalendar(currentShowAppointmentsCalendar);

            } else {
                setShowAppointmentsTable(appointments[currentCategoryPatient] && appointments[currentCategoryPatient].map((item) => {
                    return(
                    <div className={s.patient__wrapper}>
                        <strong>{counterForTableOfPatients}</strong><span className={s.patient}>{item.patient.name} {item.patient.surname}</span>
                    </div>
                    )
                }))

                const arrOfAppointmentsCalendar = appointments[currentCategoryPatient].map(appointment => ({
                    ...appointment,
                    title: appointment.title,
                    start: new Date(appointment.start).toISOString().split('T')[0],
                    end: new Date(appointment.end).toISOString().split('T')[0],
                    description: appointment.description,
                    backgroundColor: appointment.backgroundColor,
                    borderColor: appointment.backgroundColor,
                    extendedProps: {
                        patient: appointment.patient,
                        patientId: appointment.patientId,
                        staffId: appointment.staffId,
                        statusId: appointment.statusId
                    }
                }));
                setShowAppointmentsCalendar(arrOfAppointmentsCalendar);
            }
    

        }
    }, [appointments])

    return (
        <main className={s.main__schedule}>
            <div className={`container ${s.schedule__container}`}>
                <h2 className={s.main__title}>Календарь</h2>
                <div className={s.main__wrapper}>
                    <div className={s.schedule__wrapper}>
                        <FullCalendar
                            eventDrop={handleEventDrop}
                            editable={true}
                            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                            initialView="dayGridMonth"
                            locale="ru"
                            eventTimeFormat={{
                                hour: 'numeric',
                                minute: '2-digit',
                                meridiem: false
                            }}
                            dayHeaders={{
                                weekday: 'short'
                            }}
                            buttonText={{
                                today: 'Сегодня',
                                month: 'Месяц',
                                week: 'Неделя',
                                day: 'День',
                                list: 'Список'
                            }}
                            weekends={true}
                            // customButtons={{
                            //     customLabel: {
                            //         text: 'Календарь'
                            //     }
                            // }}
                            headerToolbar={{
                                start: 'prev next today list',
                                center: 'title',
                                end: 'timeGridDay timeGridWeek dayGridMonth'
                            }}
                            eventClick={handleEventClick}
                            fixedWeekCount={false}
                            events={showAppointmentsCalendar}
                            viewDidMount={handleViewDidMount}
                            dateClick={handleClickDay}
                            slotMinTime="08:00:00"
                            slotMaxTime="22:00:00"
                            allDaySlot={false}
                            slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
                            height="auto"
                            eventContent={renderEventContent}
                        />
                    </div>
                    <div className={s.patients__wrapper}>
                        <div>
                            <FormControl fullWidth size='small'>
                                <InputLabel id={s.select__status_patient}>
                                    Приемы
                                </InputLabel>
                                <Select
                                    labelId={s.select__status_patient}
                                    label={"Приемы"}
                                    defaultValue={""}
                                    value={currentCategoryPatient}
                                    onChange={(event) => {setCurrentCategoryPatient(event.target.value)}}>
                                    <MenuItem value={"All"}>Все</MenuItem>
                                    <MenuItem value={"pastAppointments"}>Прошедшие</MenuItem>
                                    <MenuItem value={"activeAppointments"}>Активные</MenuItem>
                                    <MenuItem value={"waitingAppointments"}>Ожидающие</MenuItem>
                                    <MenuItem value={"canceledAppointments"}>Отмененные</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={s.patients} style={{flex: "1 1 0"}}>
                            {showAppointmentsTable}
                        </div>
                    </div>
                </div>

                {isDescriptionModalOpen && ((selectedEvent.patient && selectedEvent.title) && <ModalWindowDescriptionEvent
                    onChangeEvent={onChangeEvent}
                    onDeleteEvent={onDeleteEvent}
                    onCloseEvent={() => setDescriptionModalOpen(false)}
                    dateEventStart={selectedEvent && selectedEvent.start && formatDate(selectedEvent.start)}
                    dateEventEnd={selectedEvent && selectedEvent.end && formatDate(selectedEvent.end)}
                    titleEvent={selectedEvent && selectedEvent.title}
                    patientEvent={selectedEvent && selectedEvent.patient}
                    timeEventStart={selectedEvent && selectedEvent.fullStartTime && formatTime(new Date(selectedEvent.fullStartTime).toTimeString())}
                    timeEventEnd={selectedEvent && selectedEvent.fullEndTime && formatTime(new Date(selectedEvent.fullEndTime).toTimeString())}
                    descriptionEvent={selectedEvent && selectedEvent.description}
                    agePacientEvent={selectedEvent && selectedEvent.agePacient}
                />
                )}

                {isModalOpen && <ModalWindowEvent selectedDate={selectedDate} onAddEvent={addEvent} onClose={onCloseModalWindow} />}
            </div>
        </main>
    );
}

export default compose(WithAuthRedirect)(Schedule);
