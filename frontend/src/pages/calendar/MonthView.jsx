import React from 'react';
import { useCalendar } from '../../hooks/useCalendar';

export default function MonthView() {
  const { events, loading } = useCalendar();

  if (loading) return <div className="p-8">Loading calendar...</div>;

  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-6">Monthly Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-sm text-gray-500 mb-1">{event.date} {event.time && `at ${event.time}`}</div>
            <h3 className="text-lg font-bold text-primary mb-2">{event.title}</h3>
            <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full uppercase">
              {event.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
