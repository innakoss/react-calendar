import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const ReactCalendar: React.FC = () => {

    //TODO: maybe add typing for useState?
    let today = new Date().toISOString();
    const [calendarEvents, setCalendarEvents] = useState([ { title: 'Current Event Title', start: today, description: 'Work' } ])
    const [modal, setModal] = useState(false);
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formDate, setFormDate] = useState('');
    const [formTimeStart, setFormTimeStart] = useState('');
    const [formTimeEnd, setFormTimeEnd] = useState('');

    const toggle = () => setModal(!modal);

    const handleDateClick = (event: any) => {
        //do check here if event has time slot clicked, 
        //if yes set time from event, if no set timeSrart & timeEnd to current time
        toggle();
        setFormDate(event.dateStr);
        let timeNow = new Date();
        let start = timeNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        let timePlusOneHour = new Date(timeNow.setHours(timeNow.getHours() + 1));
        let end = timePlusOneHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        setFormTimeStart(start);
        setFormTimeEnd(end);
    }

    const handleInputChange = (event: any) => {
        const value = event.target.value;
        const name = event.target.name;
        switch (name) {
            case 'title': {
                setFormTitle(value);
                break;
            }
            case 'description': {
                setFormDescription(value);
                break;
            }
            case 'timeStart': {
                setFormTimeStart(value);
                break;
            }
            case 'timeEnd': {
                setFormTimeEnd(value);
                break;
            }
            case 'date': {
                setFormDate(value);
                break;
            }
        }
      }

    const handleSubmit = (event: any) => {
        toggle();
        //create event start time
        const eventStart = formDate + "T" + formTimeStart + ":00";
        //add new event to events list
        setCalendarEvents(calendarEvents.concat( { title: formTitle, start: eventStart, description: formDescription} ));
        setFormTitle('');
        setFormDescription('');
        event.preventDefault();
      }

    return (
        <div>
            <FullCalendar
                defaultView="dayGridMonth"
                themeSystem="bootstrap"
                header={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                plugins={ [ dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin ] }
                events={ calendarEvents }
                dateClick={ handleDateClick }
            />
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Event</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <label>Date:</label><br />
                        <input 
                            name="date"
                            type="date"
                            value={formDate} 
                            onChange={handleInputChange} />
                        <hr />
                        <label>Time:</label><br />
                        <input
                            type="time"
                            name="timeStart"
                            value={formTimeStart}
                            onChange={handleInputChange} /> ~ 
                        <input 
                            type="time"
                            name="timeEnd"
                            value={formTimeEnd}
                            onChange={handleInputChange} />
                        <hr />
                        <label>Title:</label><br />
                        <input 
                            name="title"
                            type="text"
                            value={formTitle}
                            onChange={handleInputChange} />
                        <hr />
                        <label>Description:</label><br />
                        <textarea
                            name="description"
                            rows={4}
                            value={formDescription}
                            onChange={handleInputChange} />
                        <hr />
                        <input type="submit" value="Submit" />
                    </form>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </div>
    );
}