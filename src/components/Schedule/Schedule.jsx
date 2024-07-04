import s from "./Schedule.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useState, useEffect } from "react";
import "./Shedule.css";
import ModalWindowEvent from "../Common/ModalWindowEvent/ModalWindowEvent";
import ModalWindowDescriptionEvent from "./../Common/ModalWindowDescriptionEvent/ModalWindowDescriptionEvent";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import listPlugin from "@fullcalendar/list";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  deleteReception,
  getClinicSchedule,
  getScheduleAndPatients,
  getScheduleStatus,
  getScheduleType,
  updateAdmission,
} from "../../redux/schedule";
import Check from "@mui/icons-material/Check";
import ModalWindowChangeTime from "../Common/ModalWindowChangeTime/ModalWindowChangeTime";
import { getPersonal } from "../../redux/personal";
import {
  removeNotification,
  setErrorNotification,
  setNotificationText,
  showNotification,
} from "../../redux/notification";
import ModalWindowConfirmAction from "../Common/ModalWindowConfirmAction/ModalWindowConfirmAction";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const colors = ["#F35774", "#00BA34", "#52BDF0", "#8B5CF6", "#F4AA2C"];

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
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [isModalTimeOpen, setIsModalTimeOpen] = useState(false);
  const [currentCategoryPatient, setCurrentCategoryPatient] = useState("All");
  const [appointments, setAppointments] = useState({});
  const [showAppointmentsTable, setShowAppointmentsTable] = useState([]);
  const [showAppointmentsCalendar, setShowAppointmentsCalendar] = useState([]);
  const [confirmHandler, setConfirmHandler] = useState(null);
  const [cancelHandler, setCancelHandler] = useState(null);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

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
          start:
            view === "dayGridMonth"
              ? new Date(appointment.start).toISOString().split("T")[0]
              : appointment.start,
          end:
            view === "dayGridMonth"
              ? new Date(appointment.end).toISOString().split("T")[0]
              : appointment.end,
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
    setDescriptionModalOpen(true);
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
    const startTime = eventInfo.event.extendedProps.start && eventInfo.event.extendedProps.start
      .split("T")[1]
      .slice(0, 5);
    const endTime = eventInfo.event.extendedProps.end && eventInfo.event.extendedProps.end.split("T")[1].slice(0, 5);

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
          start:
            currentView === "dayGridMonth"
              ? new Date(appointment.start).toISOString().split("T")[0]
              : new Date(appointment.start),
          end:
            currentView === "dayGridMonth"
              ? new Date(appointment.end).toISOString().split("T")[0]
              : new Date(appointment.end),
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
            start: new Date(appointment.start).toISOString().split("T")[0],
            end: new Date(appointment.end).toISOString().split("T")[0],
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

  const onClickChangeReceptionStatus = (
    receptionStatusId,
    selectedEventArg
  ) => {
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

  const handleClickOnCompleteProcedure = (patientId, receptionId) => {
    navigate(`/patient-order/${patientId}/${receptionId}`);
    setSelectedEvent(null);
  };
  return (
    <main className={s.main__schedule}>
      <div className={`container ${s.schedule__container}`}>
        <div className={s.header__wrapper}>
          <h2 className={s.main__title}>Календарь</h2>
          <div>
            <FormControl fullWidth>
              <InputLabel id={s.personal__schedule_id}>Персонал</InputLabel>
              <Select
                label="Персонал"
                size="small"
                labelId={s.personal__schedule_id}
                defaultValue={0}
                id={s.personal__schedule}
                onChange={(curValue) =>
                  setCurrentScheduleStatus(curValue.target.value)
                }
              >
                <MenuItem value={0}>Все</MenuItem>
                {personal &&
                  personal.map((dentist) => (
                    <MenuItem value={dentist.id}>
                      {dentist.surname + " " + dentist.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className={s.main__wrapper}>
          <div className={s.schedule__wrapper}>
            <FullCalendar
              eventDrop={handleEventDrop}
              eventResize={handleEventResize}
              editable={true}
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin,
                listPlugin,
              ]}
              initialView="dayGridMonth"
              locale="ru"
              eventTimeFormat={{
                hour: "numeric",
                minute: "2-digit",
                meridiem: false,
              }}
              dayHeaders={{
                weekday: "short",
              }}
              buttonText={{
                today: "Сегодня",
                month: "Месяц",
                week: "Неделя",
                day: "День",
                list: "Список",
              }}
              weekends={true}
              // customButtons={{
              //     customLabel: {
              //         text: 'Календарь'
              //     }
              // }}
              headerToolbar={{
                start: "prev next today list",
                center: "title",
                // end: "timeGridDay timeGridWeek dayGridMonth",
                end: null
              }}
              eventClick={handleEventClick}
              fixedWeekCount={false}
              events={showAppointmentsCalendar}
              viewDidMount={handleViewDidMount}
              dateClick={handleClickDay}
              slotMinTime="08:00:00"
              slotMaxTime="22:00:00"
              allDaySlot={false}
              slotLabelFormat={{
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }}
              height="auto"
              eventContent={renderEventContent}
              displayEventTime={true}
            />
          </div>
          <div className={s.patients__wrapper}>
            <div>
              <FormControl fullWidth size="small">
                <InputLabel id={s.select__status_patient}>Приемы</InputLabel>
                <Select
                  labelId={s.select__status_patient}
                  label={"Приемы"}
                  defaultValue={""}
                  value={currentCategoryPatient}
                  onChange={(event) => {
                    setCurrentCategoryPatient(event.target.value);
                  }}
                >
                  <MenuItem value={"All"}>Все</MenuItem>
                  {scheduleStatus &&
                    scheduleStatus.map((item) => (
                      <MenuItem value={item.id}>
                        {item.receptionStatus}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className={s.patients} style={{ flex: "1 1 0" }}>
              {showAppointmentsTable}
            </div>
          </div>
        </div>

        {selectedEvent &&
          !showModalWindowDescriptionReception &&
          !confirmFunction && (
            <Menu
              anchorReference="anchorPosition"
              anchorPosition={{ top: menuPosition.y, left: menuPosition.x }}
              open={open}
              onClose={() => setSelectedEvent(null)}
            >
              {scheduleStatus &&
                scheduleStatus
                  .toSorted((a, b) => {
                    if (a.id === selectedEvent.receptionStatusId) return -1;
                    if (b.id === selectedEvent.receptionStatusId) return 1;
                    return 0;
                  })
                  .map((item) => (
                    <MenuItem
                      onClick={() =>
                        onClickChangeReceptionStatus(item.id, selectedEvent)
                      }
                    >
                      {item.id === selectedEvent.receptionStatusId && (
                        <ListItemIcon>
                          <Check />
                        </ListItemIcon>
                      )}
                      <ListItemText
                        inset={item.id !== selectedEvent.receptionStatusId}
                      >
                        {item.receptionStatus}
                      </ListItemText>
                    </MenuItem>
                  ))}
              <Divider />
              <MenuItem
                onClick={() =>
                  handleClickOnCompleteProcedure(
                    (selectedEvent && selectedEvent.patient?.id) || undefined,
                    (selectedEvent && selectedEvent.id) || undefined
                  )
                }
              >
                <ListItemText>Сделать наряд</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate(
                    `/patient-card/${selectedEvent.patient?.id || undefined}`
                  )
                }
              >
                <ListItemText>К карточке пациента</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => setShowModalWindowDescriptionReception(true)}
              >
                <ListItemText>Изменить прием</ListItemText>
              </MenuItem>
            </Menu>
          )}

        {showModalWindowDescriptionReception &&
          selectedEvent &&
          !confirmFunction && (
            <ModalWindowDescriptionEvent
              reception={selectedEvent}
              onCloseEvent={onCloseModalWindowDescriptionReception}
              onDeleteReception={onDeleteReception}
              onUpdateReception={onChangeReception}
              isTreatmentPlan={false}
            />
          )}

        {isModalOpen && (
          <ModalWindowEvent
            selectedDate={selectedDate}
            onClose={onCloseModalWindow}
          />
        )}

        {isModalTimeOpen && (
          <ModalWindowChangeTime
            confirmHandler={confirmHandler}
            cancelHandler={cancelHandler}
          />
        )}

        {confirmFunction && (
          <ModalWindowConfirmAction
            close={() => {
              setConfirmFunction(null);
            }}
            confirm={confirmFunction}
          />
        )}
      </div>
    </main>
  );
};

export default compose(WithAuthRedirect)(Schedule);
