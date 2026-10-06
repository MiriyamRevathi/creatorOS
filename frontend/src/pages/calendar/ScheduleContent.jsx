import React, { useState } from 'react';
import { useCalendar } from '../../hooks/useCalendar';

export default function ScheduleContent() {
    const { addEvent } = useCalendar();
    const [title, setTitle] = useState('');

    const handleSave = () => {
        addEvent({ title, date: 15 });
        setTitle('');
    };

    return (
        <div className="max-w-md bg-white p-6 rounded-xl shadow-lg border-t-4 border-accent2">
            <h2 className="text-2xl font-bold text-primary mb-4">Schedule Content</h2>
            <input 
                className="w-full border-2 border-gray-200 p-2 rounded mb-4 focus:outline-none focus:border-secondary" 
                value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Content Title..." />
            <button className="bg-secondary text-white px-4 py-2 rounded font-medium hover:bg-primary transition-colors" onClick={handleSave}>
                Save to Schedule
            </button>
        </div>
    );
}
