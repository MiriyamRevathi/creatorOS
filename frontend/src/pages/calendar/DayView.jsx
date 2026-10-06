import React from 'react';
import { useCalendar } from '../../hooks/useCalendar';

export default function DayView() {
  const { events, loading } = useCalendar();
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysEvents = events.filter(e => e.date === todayStr);

  if (loading) return <div className="p-8">Loading calendar...</div>;

  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-6">Today's Schedule ({todayStr})</h2>
      {todaysEvents.length === 0 ? (
        <div className="text-gray-500 italic">No events scheduled for today.</div>
      ) : (
        <div className="space-y-4">
          {todaysEvents.map(event => (
            <div key={event.id} className="p-4 border-l-4 border-accent1 bg-gray-50 rounded shadow-sm">
              <h3 className="text-xl font-bold text-secondary">{event.title}</h3>
              <p className="text-gray-600">Time: {event.time || 'All Day'} | Type: {event.type}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-accent2 text-white text-xs font-bold rounded-full uppercase">
                {event.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
