import React from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import CalendarEvent from './CalendarEvent';

export default function CalendarGrid() {
    const { events, loading } = useCalendar();

    if (loading) return <div className="text-secondary p-4">Loading calendar...</div>;

    return (
        <div className="grid grid-cols-7 gap-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-secondary pb-2 border-b-2 border-accent1">
                    {day}
                </div>
            ))}
            {/* Mock grid cells */}
            {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="min-h-[100px] border border-gray-100 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <span className="text-sm text-gray-400">{i + 1 <= 31 ? i + 1 : ''}</span>
                    {events.map((evt, idx) => evt.date === i + 1 ? (
                        <CalendarEvent key={idx} event={evt} />
                    ) : null)}
                </div>
            ))}
        </div>
    );
}
