import s from "./Schedule.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React from "react";
import "./Shedule.css";
import ModalWindowEventContainer from "../../Common/ModalWindowEventContainer/ModalWindowEventContainer";
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
import Check from "@mui/icons-material/Check";
import ModalWindowChangeTimeContainer from "../../Common/ModalWindowChangeTimeContainer/ModalWindowChangeTimeContainer";
import ModalWindowConfirmAction from "../../Common/ModalWindowConfirmAction/ModalWindowConfirmAction";
import ModalWindowDescriptionEventContainer from "../../Common/ModalWindowDescriptionEventContainer/ModalWindowDescriptionEventContainer";

const Schedule = ({
  setCurrentScheduleStatus,
  personal,
  handleEventDrop,
  handleEventResize,
  handleEventClick,
  showAppointmentsCalendar,
  handleViewDidMount,
  handleClickDay,
  renderEventContent,
  isModalOpen,
  menuPosition,
  open,
  scheduleStatus,
  selectedDate,
  isModalTimeOpen,
  setCurrentCategoryPatient,
  currentCategoryPatient,
  onClickShowReceptionInfo,
  onClickPatient,
  handleClickOnCompleteProcedure,
  onClickChangeReceptionStatus,
  onCloseModalWindowDescriptionReception,
  onChangeReception,
  onDeleteReception,
  onCloseModalWindow,
  showAppointmentsTable,
  selectedEvent,
  showModalWindowDescriptionReception,
  confirmFunction,
  setSelectedEvent,
  confirmHandler,
  cancelHandler,
  setConfirmFunction,
}) => {
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
              initialView="timeGridWeek"
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
              }}
              weekends={true}
              headerToolbar={{
                start: "prev next today",
                center: "title",
                end: null,
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
              // fix
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
                      onClick={onClickChangeReceptionStatus(
                        item.id,
                        selectedEvent
                      )}
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
                onClick={handleClickOnCompleteProcedure(
                  (selectedEvent && selectedEvent.patient?.id) || undefined,
                  (selectedEvent && selectedEvent.id) || undefined
                )}
              >
                <ListItemText>Сделать наряд</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={onClickPatient(selectedEvent.patient?.id || undefined)}
              >
                <ListItemText>К карточке пациента</ListItemText>
              </MenuItem>
              <MenuItem onClick={onClickShowReceptionInfo}>
                <ListItemText>Изменить прием</ListItemText>
              </MenuItem>
            </Menu>
          )}

        {showModalWindowDescriptionReception &&
          selectedEvent &&
          !confirmFunction && (
            <ModalWindowDescriptionEventContainer
              reception={selectedEvent}
              onCloseEvent={onCloseModalWindowDescriptionReception}
              onDeleteReception={onDeleteReception}
              onUpdateReception={onChangeReception}
              isTreatmentPlan={false}
            />
          )}

        {isModalOpen && (
          <ModalWindowEventContainer
            selectedDate={selectedDate}
            onClose={onCloseModalWindow}
          />
        )}

        {isModalTimeOpen && (
          <ModalWindowChangeTimeContainer
            confirmHandler={confirmHandler}
            cancelHandler={cancelHandler}
          />
        )}

        {confirmFunction && (
          <ModalWindowConfirmAction
            // fix
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

export default Schedule;
