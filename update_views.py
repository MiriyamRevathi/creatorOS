import os

base_dir = r"D:\creator OS\frontend\src\pages\calendar"

day_view = """import React from 'react';
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
"""

week_view = """import React from 'react';
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
"""

month_view = """import React from 'react';
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
"""

with open(os.path.join(base_dir, 'DayView.jsx'), 'w') as f:
    f.write(day_view)
with open(os.path.join(base_dir, 'WeekView.jsx'), 'w') as f:
    f.write(week_view)
with open(os.path.join(base_dir, 'MonthView.jsx'), 'w') as f:
    f.write(month_view)

print("Views updated.")
