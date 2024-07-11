import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteReception,
  getClinicSchedule,
  getScheduleAndPatients,
  getScheduleStatus,
  getScheduleType,
  updateAdmission,
} from "../../redux/schedule";
import { getPersonal } from "../../redux/personal";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../redux/notification";
import Schedule from "./Schedule/Schedule";
import s from "./Schedule/Schedule.module.css";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";

const ScheduleContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // reception menu
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const open = Boolean(selectedEvent);

  // schedule status
  const { scheduleStatus } = useSelector((state) => state.schedule);

  // rest states
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const { user, isAuth, loadingUser } = useSelector((state) => state.user);
  const { schedule } = useSelector((state) => state.schedule);
  const { personal } = useSelector((state) => state.personal);
  const [currentScheduleStatus, setCurrentScheduleStatus] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalTimeOpen, setIsModalTimeOpen] = useState(false);
  const [currentCategoryPatient, setCurrentCategoryPatient] = useState("All");
  const [appointments, setAppointments] = useState({}); // fix
  const [showAppointmentsTable, setShowAppointmentsTable] = useState([]);
  const [showAppointmentsCalendar, setShowAppointmentsCalendar] = useState([]);
  const [confirmHandler, setConfirmHandler] = useState(null);
  const [cancelHandler, setCancelHandler] = useState(null);

  const fetchAllSchedule = async (clinicId) => {
    await dispatch(getClinicSchedule(clinicId));
  };

  const fetchPersonalSchedule = async (staffId) => {
    await dispatch(getScheduleAndPatients(staffId));
  };

  useEffect(() => {
    if (isAuth && !loadingUser) {
      dispatch(getPersonal(user.clinicId));
      dispatch(getScheduleStatus());
      dispatch(getScheduleType());
      if (currentScheduleStatus === 0) {
        fetchAllSchedule(user.clinicId);
      } else {
        fetchPersonalSchedule(currentScheduleStatus);
      }
    }
  }, [isAuth, loadingUser, currentScheduleStatus]);

  const onCloseModalWindow = () => {
    setIsModalOpen(false);
  };

  const transformAppointmentsToEvents = (appointments, view) => {
    let events = [];
    for (let category in appointments) {
      events = [
        ...events,
        ...appointments[category].map((appointment) => ({
          title: appointment.title,
          // start:
          //   view === "dayGridMonth"
          //     ? new Date(appointment.start).toISOString().split("T")[0]
          //     : appointment.start,
          start: appointment.start,
          // end:
          //   view === "dayGridMonth"
          //     ? new Date(appointment.end).toISOString().split("T")[0]
          //     : appointment.end,
          end: appointment.end,
          description: appointment.description,
          backgroundColor: appointment.backgroundColor,
          borderColor: appointment.backgroundColor,
          extendedProps: {
            id: appointment.id,
            patient: appointment.patient,
            patientId: appointment.patientId,
            attendingStaffId: appointment.attendingStaffId,
            referringStaffId: appointment.referringStaffId,
            start: appointment.start,
            end: appointment.end,
            receptionStatusId: appointment.receptionStatusId,
            receptionTypeId: appointment.receptionTypeId,
          },
          textColor: "white",
        })),
      ];
    }
    return events;
  };

  const handleClickDay = (info) => {
    setSelectedDate(info.dateStr); // Записываем выбранную дату
    setIsModalOpen((prev) => !prev);
  };

  const handleEventClick = (info) => {
    setMenuPosition({
      x: info.jsEvent.clientX,
      y: info.jsEvent.clientY,
    });
    setSelectedEvent(info.event.extendedProps);
  };

  const userConfirmsChanges = (revert, id, startEndDate) => {
    return new Promise((resolve, reject) => {
      setIsModalTimeOpen(true);

      setConfirmHandler(() => async (startEvent, endEvent) => {
        const [startHours, startMinutes] = startEvent.split(":").map(Number);
        const [endHours, endMinutes] = endEvent.split(":").map(Number);
        const startDate = new Date(startEndDate);
        const endDate = new Date(startEndDate);

        const startStringDate = `${startDate.getFullYear()}-${
          (endDate.getMonth() < 9 && `0${endDate.getMonth() + 1}`) ||
          endDate.getMonth() + 1
        }-${startDate.getDate()}T${startHours}:${startMinutes}:00.000Z`;
        const endStringDate = `${endDate.getFullYear()}-${
          (endDate.getMonth() < 9 && `0${endDate.getMonth() + 1}`) ||
          endDate.getMonth() + 1
        }-${endDate.getDate()}T${endHours}:${endMinutes}:00.000Z`;

        dispatch(
          updateAdmission({ id, start: startStringDate, end: endStringDate })
        )
          .then((res) => {
            setIsModalTimeOpen(false);
            resolve(true);
          })
          .catch((error) => {
            setIsModalTimeOpen(false);
            reject(error);
          });
      });

      setCancelHandler(() => () => {
        revert();
        setIsModalTimeOpen(false);
        resolve(false);
      });
    });
  };

  const handleEventDrop = async (info) => {
    const { event, revert } = info;
    let start, end;

    if (currentView === "dayGridMonth") {
      const userConfirmed = await userConfirmsChanges(
        revert,
        event.extendedProps.id,
        event.start
      );
    } else {
      start = event.start;
      end = event.end;
      const id = event.extendedProps.id;
      const res = await dispatch(updateAdmission({ id, start, end }));
    }
    if (currentScheduleStatus === 0) {
      fetchAllSchedule(user.clinicId);
    } else {
      fetchPersonalSchedule(user.id);
    }
  };

  const handleEventResize = async (info) => {
    const { event } = info;
    const start = event.start;
    const end = event.end;
    const id = event.extendedProps.id;

    const res = await dispatch(updateAdmission({ id, start, end }));
    if (currentScheduleStatus === 0) {
      fetchAllSchedule(user.clinicId);
    } else {
      fetchPersonalSchedule(user.id);
    }
  };

  let handleViewDidMount = (info) => {
    setCurrentView(info.view.type);
    if (appointments) {
      const events = transformAppointmentsToEvents(
        appointments,
        info.view.type
      );
      setShowAppointmentsCalendar(events);
    }
  };

  const renderEventContent = (eventInfo) => {
    const startTime =
      eventInfo.event.extendedProps.start &&
      eventInfo.event.extendedProps.start.split("T")[1].slice(0, 5);
    const endTime =
      eventInfo.event.extendedProps.end &&
      eventInfo.event.extendedProps.end.split("T")[1].slice(0, 5);

    return {
      html: `<span>${startTime} - ${endTime} <br>${
        eventInfo.event.extendedProps.patient &&
        eventInfo.event.extendedProps.patient.name
      }</span>`,
    };
  };

  useEffect(() => {
    if (schedule) {
      if (currentCategoryPatient === "All") {
        let currentShowAppointmentsTable = [];
        let currentShowAppointmentsCalendar = [];
        let index = 0;
        const arrOfAppointments = schedule.map((item) => {
          index++;
          return (
            <div className={s.patient__wrapper}>
              <strong>{index}</strong>
              <span className={s.patient}>
                {item.patient && item.patient.name}{" "}
                {item.patient && item.patient.surname}
              </span>
            </div>
          );
        });
        const arrOfAppointmentsCalendar = schedule.map((appointment) => ({
          title: appointment.title,
          // start:
          //   currentView === "dayGridMonth"
          //     ? new Date(appointment.start).toISOString().split("T")[0]
          //     : new Date(appointment.start),
          start: new Date(appointment.start),
          // end:
          //   currentView === "dayGridMonth"
          //     ? new Date(appointment.end).toISOString().split("T")[0]
          //     : new Date(appointment.end),
          end: new Date(appointment.end),
          backgroundColor: appointment.backgroundColor,
          borderColor: appointment.backgroundColor,
          description: appointment.description,
          extendedProps: {
            id: appointment.id,
            patient: appointment.patient,
            patientId: appointment.patientId,
            attendingStaffId: appointment.attendingStaffId,
            referringStaffId: appointment.referringStaffId,
            start: appointment.start,
            end: appointment.end,
            receptionStatusId: appointment.receptionStatusId,
            receptionTypeId: appointment.receptionTypeId,
          },
        }));
        currentShowAppointmentsTable = [
          ...currentShowAppointmentsTable,
          ...arrOfAppointments,
        ];
        currentShowAppointmentsCalendar = [
          ...currentShowAppointmentsCalendar,
          ...arrOfAppointmentsCalendar,
        ];
        setShowAppointmentsTable(currentShowAppointmentsTable);
        setShowAppointmentsCalendar(currentShowAppointmentsCalendar);
      } else {
        const filtredSchedule =
          schedule &&
          schedule.filter(
            (item) => +item.receptionStatusId === +currentCategoryPatient
          );
        setShowAppointmentsTable(
          filtredSchedule.map((item, index) => {
            return (
              <div className={s.patient__wrapper}>
                <strong>{index + 1}</strong>
                <span className={s.patient}>
                  {item.patient.name} {item.patient.surname}
                </span>
              </div>
            );
          })
        );

        const arrOfAppointmentsCalendar = filtredSchedule.map(
          (appointment) => ({
            ...appointment,
            title: appointment.title,
            // start:
            //   currentView === "dayGridMonth"
            //     ? new Date(appointment.start).toISOString().split("T")[0]
            //     : new Date(appointment.start),
            start: new Date(appointment.start),
            // end:
            //   currentView === "dayGridMonth"
            //     ? new Date(appointment.end).toISOString().split("T")[0]
            //     : new Date(appointment.end),
            end: new Date(appointment.end),
            description: appointment.description,
            backgroundColor: appointment.backgroundColor,
            borderColor: appointment.backgroundColor,
            extendedProps: {
              id: appointment.id,
              patient: appointment.patient,
              patientId: appointment.patientId,
              attendingStaffId: appointment.attendingStaffId,
              referringStaffId: appointment.referringStaffId,
              start: appointment.start,
              end: appointment.end,
              receptionStatusId: appointment.receptionStatusId,
              receptionTypeId: appointment.receptionTypeId,
            },
          })
        );
        setShowAppointmentsCalendar(arrOfAppointmentsCalendar);
      }
    }
  }, [schedule, currentCategoryPatient]);

  // reception context menu

  const [
    showModalWindowDescriptionReception,
    setShowModalWindowDescriptionReception,
  ] = useState(false);

  const [confirmFunction, setConfirmFunction] = useState(null);

  const onDeleteReception = (receptionId) => {
    setConfirmFunction(() => async () => {
      const res = await dispatch(deleteReception(receptionId));
      if (res.type === "schedule/delete-reception/fulfilled") {
        dispatch(setErrorNotification(false));
        dispatch(setNotificationText("Прием был успешно удален"));
      } else {
        dispatch(setErrorNotification(true));
        dispatch(
          setNotificationText(
            res?.payload?.response?.data?.message ||
              "Прием не был удален, попробуйте еще раз"
          )
        );
      }
      dispatch(showNotification());
      removeNotification(dispatch);
      setConfirmFunction(null);
      setSelectedEvent(null);
    });
  };

  const onChangeReception = async (data) => {
    if (data) {
      setConfirmFunction(() => async () => {
        const res = await dispatch(updateAdmission(data));
        if (res?.payload?.status === 200) {
          dispatch(setErrorNotification(false));
          dispatch(setNotificationText("Прием был успешно изменен"));
        } else {
          dispatch(setErrorNotification(true));
          dispatch(
            setNotificationText(
              res?.payload?.response?.data?.message ||
                "Прием не был изменен, попробуйте еще раз"
            )
          );
        }
        setConfirmFunction(null);
        setSelectedEvent(null);
        setShowModalWindowDescriptionReception(false);
        dispatch(showNotification());
        removeNotification(dispatch);
      });
    } else {
      dispatch(setErrorNotification(true));
      dispatch(setNotificationText("Вы ничего не изменили"));
      setConfirmFunction(null);
      dispatch(showNotification());
      removeNotification(dispatch);
    }
  };

  const onCloseModalWindowDescriptionReception = () =>
    setShowModalWindowDescriptionReception(false);

  const onClickChangeReceptionStatus =
    (receptionStatusId, selectedEventArg) => (e) => {
      if (selectedEventArg.receptionStatusId !== receptionStatusId) {
        setConfirmFunction(() => async () => {
          const res = await dispatch(
            updateAdmission({ id: selectedEventArg.id, receptionStatusId })
          );
          if (res.type === "schedule/updateAdmission/fulfilled") {
            dispatch(setErrorNotification(false));
            dispatch(setNotificationText("Статус приема был успешно изменен"));
          } else {
            dispatch(setErrorNotification(true));
            dispatch(
              setNotificationText(
                res?.payload?.response?.data?.message ||
                  "Статус приемы не был изменен, попробуйте позже"
              )
            );
          }
          setConfirmFunction(null);
          setSelectedEvent(null);
          dispatch(showNotification());
          removeNotification(dispatch);
        });
      }
    };

  const handleClickOnCompleteProcedure = (patientId, receptionId) => (e) => {
    navigate(`/patient-order/${patientId}/${receptionId}`);
    setSelectedEvent(null);
  };

  const onClickPatient = (patientId) => (e) => {
    if (patientId) navigate(`/patient-card/${patientId}`);
  };

  const onClickShowReceptionInfo = () =>
    setShowModalWindowDescriptionReception(true);

  return (
    <Schedule
      setCurrentScheduleStatus={setCurrentScheduleStatus}
      personal={personal}
      handleEventDrop={handleEventDrop}
      handleEventResize={handleEventResize}
      handleEventClick={handleEventClick}
      showAppointmentsCalendar={showAppointmentsCalendar}
      handleViewDidMount={handleViewDidMount}
      handleClickDay={handleClickDay}
      renderEventContent={renderEventContent}
      isModalOpen={isModalOpen}
      menuPosition={menuPosition}
      open={open}
      scheduleStatus={scheduleStatus}
      selectedDate={selectedDate}
      isModalTimeOpen={isModalTimeOpen}
      setCurrentCategoryPatient={setCurrentCategoryPatient}
      currentCategoryPatient={currentCategoryPatient}
      onClickShowReceptionInfo={onClickShowReceptionInfo}
      onClickPatient={onClickPatient}
      handleClickOnCompleteProcedure={handleClickOnCompleteProcedure}
      onClickChangeReceptionStatus={onClickChangeReceptionStatus}
      onCloseModalWindowDescriptionReception={
        onCloseModalWindowDescriptionReception
      }
      onChangeReception={onChangeReception}
      onDeleteReception={onDeleteReception}
      onCloseModalWindow={onCloseModalWindow}
      showAppointmentsTable={showAppointmentsTable}
      selectedEvent={selectedEvent}
      showModalWindowDescriptionReception={showModalWindowDescriptionReception}
      confirmFunction={confirmFunction}
      setSelectedEvent={setSelectedEvent}
      confirmHandler={confirmHandler}
      cancelHandler={cancelHandler}
      setConfirmFunction={setConfirmFunction}
    />
  );
};

export default compose(WithAuthRedirect)(ScheduleContainer);
