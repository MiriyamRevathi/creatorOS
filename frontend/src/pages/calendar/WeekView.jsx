import React from 'react';
import { useCalendar } from '../../hooks/useCalendar';

export default function WeekView() {
  const { events, loading } = useCalendar();

  if (loading) return <div className="p-8">Loading calendar...</div>;

  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-6">This Week's Schedule</h2>
      <div className="grid grid-cols-7 gap-4">
        {[0,1,2,3,4,5,6].map(offset => {
          const d = new Date();
          d.setDate(d.getDate() + offset);
          const dateStr = d.toISOString().split('T')[0];
          const dayEvents = events.filter(e => e.date === dateStr);
          
          return (
            <div key={offset} className="min-h-[150px] border border-gray-200 rounded p-2 bg-gray-50">
              <div className="font-bold text-sm text-secondary mb-2">{d.toLocaleDateString('en-US', {weekday: 'short'})} <br/> {d.getDate()}</div>
              {dayEvents.map(event => (
                <div key={event.id} className="mb-2 p-2 bg-white border border-gray-200 rounded text-xs shadow-sm">
                  <div className="font-bold text-primary truncate">{event.title}</div>
                  <div className="text-gray-500">{event.time}</div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  );
}
