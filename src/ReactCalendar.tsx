import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const ReactCalendar: React.FC = () => {

    //TODO: maybe add typing for useState?
    const [calendarEvents, setCalendarEvents] = useState([ { title: 'Current Event Title', start: new Date() } ])
    const [modal, setModal] = useState(false);
    const [value, setValue] = useState('');

    const toggle = () => setModal(!modal);

    const handleDateClick = (e: any) => {
        toggle();
    }

    const handleCreateEvent = (e: any) => {
        e.preventDefault(); 
        console.log('event fired');
        console.log(e);
        toggle();
        // TODO: make start to accept clicked day date
        setCalendarEvents(calendarEvents.concat( { title: value, start:new Date() } ));
        console.log(calendarEvents);
    }

    const handleChange = (event: any) => {
        setValue(event.target.value);
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
                    <form onSubmit={handleCreateEvent}>
                        <label>
                        Title:
                        <input type="text" value={value} onChange={handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                {/* <Button color="primary" onSubmit={createEvent}>Create</Button> */}
                </ModalFooter>
            </Modal>
        </div>
    );
}