import os

base_dir = r"D:\creator OS\frontend\src"

app_jsx = """import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ContentCalendar from './pages/calendar/ContentCalendar';
import DayView from './pages/calendar/DayView';
import WeekView from './pages/calendar/WeekView';
import MonthView from './pages/calendar/MonthView';
import ScheduleContent from './pages/calendar/ScheduleContent';

import CollaborationHub from './pages/collaborations/CollaborationHub';
import Projects from './pages/collaborations/Projects';
import ProjectDetails from './pages/collaborations/ProjectDetails';
import Team from './pages/collaborations/Team';
import Tasks from './pages/collaborations/Tasks';
import Messages from './pages/collaborations/Messages';

// Dummy components for new requested buttons
const Placeholder = ({ title }) => (
  <div className="p-8 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
    <p className="text-gray-600">This feature is integrated into the CreatorOS workspace.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        <nav className="w-64 bg-primary text-white p-4 overflow-y-auto h-full shadow-lg">
          <h1 className="text-2xl font-bold mb-8 text-accent1">CreatorOS</h1>
          
          <div className="mb-6">
            <h2 className="text-sm uppercase text-gray-400 font-bold mb-2">Content Calendar</h2>
            <ul className="pl-2 space-y-2">
              <li><Link to="/calendar" className="hover:text-accent2 block">Dashboard</Link></li>
              <li><Link to="/calendar/day" className="hover:text-accent2 block">Daily View</Link></li>
              <li><Link to="/calendar/week" className="hover:text-accent2 block">Weekly View</Link></li>
              <li><Link to="/calendar/month" className="hover:text-accent2 block">Monthly View</Link></li>
              <li><Link to="/calendar/drag-drop" className="hover:text-accent2 block">Drag-and-drop Scheduling</Link></li>
              <li><Link to="/calendar/deadlines" className="hover:text-accent2 block">Deadlines</Link></li>
              <li><Link to="/calendar/reminders" className="hover:text-accent2 block">Reminders</Link></li>
              <li><Link to="/calendar/upcoming" className="hover:text-accent2 block">Upcoming Content</Link></li>
              <li><Link to="/calendar/publishing-status" className="hover:text-accent2 block">Publishing Status</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm uppercase text-gray-400 font-bold mb-2">Collaboration Hub</h2>
            <ul className="pl-2 space-y-2">
              <li><Link to="/collaborations" className="hover:text-accent2 block">Hub Overview</Link></li>
              <li><Link to="/collaborations/projects" className="hover:text-accent2 block">Projects</Link></li>
              <li><Link to="/collaborations/teams" className="hover:text-accent2 block">Teams</Link></li>
              <li><Link to="/collaborations/team-members" className="hover:text-accent2 block">Team Members</Link></li>
              <li><Link to="/collaborations/tasks" className="hover:text-accent2 block">Tasks</Link></li>
              <li><Link to="/collaborations/assignments" className="hover:text-accent2 block">Assignments</Link></li>
              <li><Link to="/collaborations/collab-deadlines" className="hover:text-accent2 block">Deadlines</Link></li>
              <li><Link to="/collaborations/comments" className="hover:text-accent2 block">Comments</Link></li>
              <li><Link to="/collaborations/activity-history" className="hover:text-accent2 block">Activity History</Link></li>
              <li><Link to="/collaborations/project-status" className="hover:text-accent2 block">Project Status</Link></li>
              <li><Link to="/collaborations/messages" className="hover:text-accent2 block">Messages</Link></li>
            </ul>
          </div>
        </nav>
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/calendar" element={<ContentCalendar />} />
            <Route path="/calendar/day" element={<DayView />} />
            <Route path="/calendar/week" element={<WeekView />} />
            <Route path="/calendar/month" element={<MonthView />} />
            <Route path="/calendar/drag-drop" element={<Placeholder title="Drag-and-drop Scheduling" />} />
            <Route path="/calendar/deadlines" element={<Placeholder title="Deadlines Tracker" />} />
            <Route path="/calendar/reminders" element={<Placeholder title="Reminders" />} />
            <Route path="/calendar/upcoming" element={<Placeholder title="Upcoming Content" />} />
            <Route path="/calendar/publishing-status" element={<Placeholder title="Publishing Status" />} />
            <Route path="/calendar/schedule" element={<ScheduleContent />} />
            
            <Route path="/collaborations" element={<CollaborationHub />} />
            <Route path="/collaborations/projects" element={<Projects />} />
            <Route path="/collaborations/projects/:id" element={<ProjectDetails />} />
            <Route path="/collaborations/teams" element={<Team />} />
            <Route path="/collaborations/team-members" element={<Placeholder title="Team Members Management" />} />
            <Route path="/collaborations/tasks" element={<Tasks />} />
            <Route path="/collaborations/assignments" element={<Placeholder title="Task Assignments" />} />
            <Route path="/collaborations/collab-deadlines" element={<Placeholder title="Project Deadlines" />} />
            <Route path="/collaborations/comments" element={<Placeholder title="Comments & Notes" />} />
            <Route path="/collaborations/activity-history" element={<Placeholder title="Activity History Feed" />} />
            <Route path="/collaborations/project-status" element={<Placeholder title="Project Status Overview" />} />
            <Route path="/collaborations/messages" element={<Messages />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
"""

with open(os.path.join(base_dir, 'App.jsx'), 'w') as f:
    f.write(app_jsx)

print("App.jsx updated with all requested buttons.")
