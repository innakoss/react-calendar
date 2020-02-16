import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

function addOneHour(currentTime: Date) {
    return new Date(currentTime.setHours(currentTime.getHours() + 1));
}

export const ReactCalendar: React.FC = () => {

    const calendarRef = React.createRef<FullCalendar>();

    //TODO: maybe add typing for useState?
    let today = new Date();
    let eventStart = today.toISOString();
    let eventEnd = addOneHour(today).toISOString();
    const [modal, setModal] = useState(false);
    const [isNewEvent, setIsNewEvent] = useState(false);
    const [eventId, setEventId] = useState(0);
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formDate, setFormDate] = useState('');
    const [formTimeStart, setFormTimeStart] = useState('');
    const [formTimeEnd, setFormTimeEnd] = useState('');
    const [calendarEvents, setCalendarEvents] = useState([
        {   
            id: eventId,
            title: 'Current Event Title',
            start: eventStart,
            end: eventEnd,
            description: 'Work' //non-standart field
        }
    ]);

    const toggle = () => setModal(!modal);

    const handleDateClick = (event: any) => {
        //do check here if event has time slot clicked, 
        //if yes set time from event, if no set timeSrart & timeEnd to current time
        setFormDate(event.dateStr);
        let timeNow = new Date();
        let start = timeNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        let timePlusOneHour = addOneHour(timeNow);
        let end = timePlusOneHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        setEventId(eventId + 1);
        setFormTitle('');
        setFormTimeStart(start);
        setFormTimeEnd(end);
        setFormDescription('');
        setIsNewEvent(true);
        toggle();
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
        // create new Id
        //create event start time
        const eventStart = formDate + "T" + formTimeStart + ":00";
        const eventEnd = formDate + "T" + formTimeEnd + ":00";
        //add new event to events list
        setCalendarEvents(calendarEvents.concat({
            id: eventId,
            title: formTitle,
            start: eventStart,
            end: eventEnd,
            description: formDescription
         }));
        // calendarRef.current?.getApi().addEvent({
        //     id: eventId,
        //     title: formTitle,
        //     start: eventStart,
        //     end: eventEnd,
        //     description: formDescription
        // })
        setFormTitle('');
        setFormDescription('');
        event.preventDefault();
      }

      const handleEventClick = (info: any) => {
          setIsNewEvent(false);
          toggle();
          let selectedEvent = info.event;
          console.log(`selectedEvent: `, selectedEvent.start.toISOString());
          let selectedEventTimeStart = selectedEvent.start.toISOString().split('T')[1].substring(0,5);
          let selectedEventTimeEnd = selectedEvent.end.toISOString().split('T')[1].substring(0,5);
          setFormDate(selectedEvent.start.toISOString().split('T')[0]);
          console.log(`selectedEventTimeStart: `, selectedEventTimeStart);
          setFormTimeStart(selectedEventTimeStart);
          setFormTimeEnd(selectedEventTimeEnd);
          setFormTitle(selectedEvent.title);
          setFormDescription(selectedEvent.extendedProps.description);
      }

      const handleEventDelete = (e: any) => {
        // let calendarApi = calendarRef.current?.getApi();
        let deleteEventId = e.target.getAttribute("id");
        //removes from current calendar
        // let deleteEvent = calendarApi?.getEventById(deleteEventId);
        console.log(`events before: `, calendarEvents);
        //this doesn't work
        setCalendarEvents(calendarEvents.filter((event) => event.id !== deleteEventId ));
        // deleteEvent?.remove();
        console.log(`events after: `, calendarEvents);
        toggle();
      }

    return (
        <div>
            <FullCalendar
                ref={calendarRef}
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
                eventClick = { handleEventClick }
            />
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{isNewEvent ? 'Add Event' : 'Edit Event'}</ModalHeader>
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
                        <input type="submit" value="Save" />
                        {!isNewEvent ? <input type="button" value="Delete" id={eventId.toString()} onClick={ handleEventDelete } /> : null }
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
}