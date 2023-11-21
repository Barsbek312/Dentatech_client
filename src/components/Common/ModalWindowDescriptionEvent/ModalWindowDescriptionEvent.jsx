import React, { useState, useEffect } from "react";
import mwe from './ModalWindowDescriptionEvent.module.css';
// import { createEvent } from "../../../redux/user";
import { useDispatch } from "react-redux";

const ModalWindowDescriptionEvent = ({ onChangeEvent, onDeleteEvent, patientEvent, agePacientEvent, onCloseEvent, dateEventStart, dateEventEnd, titleEvent, timeEventStart, timeEventEnd, descriptionEvent  }) => {

    const [title, setTitle] = React.useState(titleEvent || '');
    const [pacient, setPacient] = React.useState(patientEvent || '');
    const [date, setDate] = React.useState(dateEventStart || ''); 
    const [description, setDescription] = React.useState(descriptionEvent || '');
    const [startTime, setStartTime] = React.useState(timeEventStart || '00:00');
    const [endDate, setEndDate] = React.useState(dateEventEnd || dateEventStart || ''); 
    const [endTime, setEndTime] = React.useState(timeEventEnd || '00:00');
    const [agePacient, setAgePacient] = React.useState(agePacientEvent || '');

    const handleSubmit = async () => {
        onChangeEvent({
            pacient: pacient,
            agePacient: agePacient,
            title: title,
            start: `${date}T${startTime}`,
            end: `${endDate || date}T${endTime}`,
            description: description,
        });
    }

    return (
        <div className={mwe.modal_overlay} onClick={onCloseEvent}>
            <div className={mwe.modal_content} onClick={(e) => e.stopPropagation()}>
                <h2>Event</h2>
                <div>
                    <label>Пациент:</label>
                    <input
                        type="text"
                        value={pacient}
                        onChange={(e) => setPacient(e.target.value)}
                    />
                </div>
                <div>
                    <label>Возраст пациента:</label>
                    <input
                        type="number"
                        value={agePacient}
                        onChange={(e) => setAgePacient(e.target.value)}
                    />
                </div>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Start Time:</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <div>
                    <label>End Time:</label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit}>Change</button>
                <button onClick={onDeleteEvent}>Delete</button>
                <button onClick={onCloseEvent}>Cancel</button>
            </div>
        </div>
    )
}

export default ModalWindowDescriptionEvent;