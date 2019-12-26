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
    const [clickedDay, setClickedDay] = useState({ title: '', start: '', description: '', date: '', timeStart: '', timeEnd: '' });
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');

    const toggle = () => setModal(!modal);

    const handleDateClick = (event: any) => {
        //do check here if event has time slot clicked, 
        //if yes set time from event, if no set timeSrart & timeEnd to current time
        toggle();
        //set clicked day date
        setClickedDay({ 
            title: '',
            start: event.date,
            description:'',
            date: event.dateStr,
            timeStart: new Date().getTime().toString(),
            timeEnd: new Date().getTime().toString()
        })
        console.log(new Date().getTime().toString());
        setDate(event.dateStr);
        setTimeStart(clickedDay.timeStart);
        setTimeEnd(clickedDay.timeEnd);
        // console.log(event.date);
        // console.log(event.dateStr);
    }

    const handleInputChange = (event: any) => {
        const value = event.target.value;
        const name = event.target.name;
        switch (name) {
            case 'title': {
                setTitle(value);
                break;
            }
            case 'description': {
                setDescription(value);
                break;
            }
            case 'timeStart': {
                setTimeStart(value);
                break;
            }
            case 'timeEnd': {
                setTimeEnd(value);
                break;
            }
            // when 'date' for datepicker set here, value duplicated to description' field as well(bug)
            // case 'date': {
            //     setDate(value);
            //     break;
            // }
        }
      }

    const handleDateChange = (event: any) => {
        setDate(event.target.value);
    }

    const handleSubmit = (event: any) => {
        toggle();
        //add new event to events list
        setCalendarEvents(calendarEvents.concat( { title: title, start: date, description: description} ));
        setTitle('');
        setDescription('');
        console.log(clickedDay.start);
        console.log(calendarEvents);
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
                            value={date} 
                            onChange={handleDateChange} />
                        <hr />
                        <label>Time:</label><br />
                        <input
                            type="time"
                            name="timeStart"
                            value={timeStart}
                            onChange={handleInputChange} /> ~ 
                        <input 
                            type="time"
                            name="timeEnd"
                            value={timeEnd}
                            onChange={handleInputChange} />
                        <hr />
                        <label>Title:</label><br />
                        <input 
                            name="title"
                            type="text"
                            value={title}
                            onChange={handleInputChange} />
                        <hr />
                        <label>Description:</label><br />
                        <textarea
                            name="description"
                            rows={4}
                            value={description}
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