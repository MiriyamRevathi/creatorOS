import React from 'react';
import CalendarGrid from '../../components/calendar/CalendarGrid';

export default function ContentCalendar() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-primary mb-6">Content Calendar</h1>
            <CalendarGrid />
        </div>
    );
}
