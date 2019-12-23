import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export const ReactCalendar: React.FC = () => {
    const [calendarEvents, setCalendarEvents] = useState([ { title: 'Current Event Title', start: new Date() } ])

    const handleDateClick = (e: any) => {
        setCalendarEvents(calendarEvents.concat({ title: 'New Event', start: e.date }))
    }

    return (
        <FullCalendar 
            defaultView="dayGridMonth"
            header={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
            plugins={ [ dayGridPlugin, timeGridPlugin, interactionPlugin ] }
            events={ calendarEvents }
            dateClick={ handleDateClick }
        />
    );
}