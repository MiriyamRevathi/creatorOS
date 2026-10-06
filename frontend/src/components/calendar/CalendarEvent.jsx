import React from 'react';

export default function CalendarEvent({ event }) {
    return (
        <div className="mt-1 p-1 bg-accent1 text-white text-xs rounded shadow-sm">
            {event.title || 'Event'}
        </div>
    );
}
