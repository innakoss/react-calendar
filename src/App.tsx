import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './App.css';

const App: React.FC = () => {
  // const calendarComponentRef = React.createRef<FullCalendar>()
  const [calendarEvents, setcalendarEvents] = useState([ { title: 'Event Now', start: new Date() }]);

  return (
    <FullCalendar 
      defaultView="dayGridMonth"
      header={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }}
      plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
      dateClick={ (arg) => handleClick(arg, calendarEvents, setcalendarEvents) }
    />
  );
  
}

function handleClick(arg: any, calendarEvents: any, setcalendarEvents: any) {
  setcalendarEvents({ 
    calendarEvents: calendarEvents.concat({
      title: 'New Event',
      start: arg.date,
      allDay: arg.allDay
    })
  })
}

export default App;
