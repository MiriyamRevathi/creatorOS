import os

colors = {
    "primary": "#412653",
    "secondary": "#3F567F",
    "accent1": "#D174D2",
    "accent2": "#E0563F"
}

tailwind_cfg = f"""/** @type {{import('tailwindcss').Config}} */
export default {{
  content: [
    "./index.html",
    "./src/**/*.{{js,ts,jsx,tsx}}",
  ],
  theme: {{
    extend: {{
      colors: {colors}
    }},
  }},
  plugins: [],
}}
"""

api_js = """import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export default api;
"""

calendar_service_js = """import api from './api';

export const getCalendars = () => api.get('/calendar');
export const getCalendar = (id) => api.get(`/calendar/${id}`);
export const createCalendar = (data) => api.post('/calendar', data);
export const updateCalendar = (id, data) => api.put(`/calendar/${id}`, data);
export const deleteCalendar = (id) => api.delete(`/calendar/${id}`);
"""

collaboration_service_js = """import api from './api';

export const getProjects = () => api.get('/projects');
export const getTasks = () => api.get('/tasks');
export const getCollaborations = () => api.get('/collaborations');
"""

use_calendar_js = """import { useState, useEffect } from 'react';
import * as calendarService from '../services/calendarService';

export function useCalendar() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const res = await calendarService.getCalendars();
            setEvents(res.data);
        } catch (error) {
            console.error('Error fetching calendar', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const addEvent = async (data) => {
        await calendarService.createCalendar(data);
        fetchEvents();
    };

    return { events, loading, addEvent };
}
"""

use_collab_js = """import { useState, useEffect } from 'react';
import * as collabService from '../services/collaborationService';

export function useCollaboration() {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pRes = await collabService.getProjects();
                const tRes = await collabService.getTasks();
                setProjects(pRes.data);
                setTasks(tRes.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { projects, tasks, loading };
}
"""

content_calendar_jsx = """import React from 'react';
import CalendarGrid from '../../components/calendar/CalendarGrid';

export default function ContentCalendar() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-primary mb-6">Content Calendar</h1>
            <CalendarGrid />
        </div>
    );
}
"""

calendar_grid_jsx = """import React from 'react';
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
"""

calendar_event_jsx = """import React from 'react';

export default function CalendarEvent({ event }) {
    return (
        <div className="mt-1 p-1 bg-accent1 text-white text-xs rounded shadow-sm">
            {event.title || 'Event'}
        </div>
    );
}
"""

day_view_jsx = """import React from 'react';
export default function DayView() { return <div className="text-xl font-bold text-primary">Day View</div>; }
"""
week_view_jsx = """import React from 'react';
export default function WeekView() { return <div className="text-xl font-bold text-primary">Week View</div>; }
"""
month_view_jsx = """import React from 'react';
export default function MonthView() { return <div className="text-xl font-bold text-primary">Month View</div>; }
"""
schedule_content_jsx = """import React, { useState } from 'react';
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
"""

collab_hub_jsx = """import React from 'react';
import { useCollaboration } from '../../hooks/useCollaboration';

export default function CollaborationHub() {
    const { projects, tasks } = useCollaboration();
    
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-primary mb-6">Collaboration Hub</h1>
            <div className="grid grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-secondary mb-4">Active Projects ({projects.length})</h2>
                    <p className="text-gray-500">Manage your ongoing creative endeavors here.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-accent1">
                    <h2 className="text-xl font-semibold text-secondary mb-4">My Tasks ({tasks.length})</h2>
                    <p className="text-gray-500">Stay on top of your deliverables.</p>
                </div>
            </div>
        </div>
    );
}
"""

projects_jsx = """import React from 'react';
import ProjectCard from '../../components/collaboration/ProjectCard';
import { useCollaboration } from '../../hooks/useCollaboration';

export default function Projects() {
    const { projects, loading } = useCollaboration();

    if (loading) return <p>Loading projects...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-primary mb-6">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.length ? projects.map((p, i) => <ProjectCard key={i} project={p} />) : <p className="text-gray-500">No active projects.</p>}
            </div>
        </div>
    );
}
"""

project_card_jsx = """import React from 'react';

export default function ProjectCard({ project }) {
    return (
        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-accent1 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-primary">{project.name || 'Untitled Project'}</h3>
            <p className="text-sm text-gray-500 mt-2">{project.description || 'No description provided.'}</p>
            <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 bg-gray-100 text-xs rounded text-secondary font-medium">Active</span>
            </div>
        </div>
    );
}
"""

tasks_jsx = """import React from 'react';
import TaskCard from '../../components/collaboration/TaskCard';
import { useCollaboration } from '../../hooks/useCollaboration';

export default function Tasks() {
    const { tasks } = useCollaboration();
    return (
        <div>
            <h1 className="text-2xl font-bold text-primary mb-6">Tasks</h1>
            <div className="flex flex-col gap-4">
                {tasks.length ? tasks.map((t, i) => <TaskCard key={i} task={t} />) : <p className="text-gray-500">No tasks pending.</p>}
            </div>
        </div>
    );
}
"""

task_card_jsx = """import React from 'react';

export default function TaskCard({ task }) {
    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-accent2 transition-colors">
            <div className="flex items-center gap-4">
                <input type="checkbox" className="w-5 h-5 accent-accent2" />
                <span className="text-primary font-medium">{task.title || 'New Task'}</span>
            </div>
            <span className="text-xs text-secondary font-semibold uppercase bg-gray-50 px-2 py-1 rounded">
                {task.status || 'To Do'}
            </span>
        </div>
    );
}
"""

files_to_write = {
    "frontend/tailwind.config.js": tailwind_cfg,
    "frontend/src/services/api.js": api_js,
    "frontend/src/services/calendarService.js": calendar_service_js,
    "frontend/src/services/collaborationService.js": collaboration_service_js,
    "frontend/src/hooks/useCalendar.js": use_calendar_js,
    "frontend/src/hooks/useCollaboration.js": use_collab_js,
    "frontend/src/pages/calendar/ContentCalendar.jsx": content_calendar_jsx,
    "frontend/src/components/calendar/CalendarGrid.jsx": calendar_grid_jsx,
    "frontend/src/components/calendar/CalendarEvent.jsx": calendar_event_jsx,
    "frontend/src/pages/calendar/DayView.jsx": day_view_jsx,
    "frontend/src/pages/calendar/WeekView.jsx": week_view_jsx,
    "frontend/src/pages/calendar/MonthView.jsx": month_view_jsx,
    "frontend/src/pages/calendar/ScheduleContent.jsx": schedule_content_jsx,
    "frontend/src/pages/collaborations/CollaborationHub.jsx": collab_hub_jsx,
    "frontend/src/pages/collaborations/Projects.jsx": projects_jsx,
    "frontend/src/components/collaboration/ProjectCard.jsx": project_card_jsx,
    "frontend/src/pages/collaborations/Tasks.jsx": tasks_jsx,
    "frontend/src/components/collaboration/TaskCard.jsx": task_card_jsx,
}

base_path = r"D:\creator OS"

for rel_path, content in files_to_write.items():
    full_path = os.path.join(base_path, os.path.normpath(rel_path))
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Frontend files generated.")
