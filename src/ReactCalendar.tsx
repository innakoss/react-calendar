import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';

export const ReactCalendar: React.FC = () => {

    const [calendarEvents, setCalendarEvents] = useState([ { title: 'Current Event Title', start: new Date() } ])
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const handleDateClick = (e: any) => {
        toggle();
    }

    const addEvent = (e: any) => {
        setCalendarEvents(calendarEvents.concat({ title: 'New Event', start: e.date }))
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
                    <FormGroup>
                     <Label for="title">Title</Label>
                     <Input type="text" name="title" id="title" />
                    </FormGroup>
                    <FormGroup>
                     <Label for="description">Description</Label>
                     <Input type="textarea" name="description" id="description" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                <Button color="primary" onClick={addEvent}>Create</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}