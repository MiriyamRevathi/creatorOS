import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ContentCalendar from './pages/calendar/ContentCalendar';
import DayView from './pages/calendar/DayView';
import WeekView from './pages/calendar/WeekView';
import MonthView from './pages/calendar/MonthView';
import ScheduleContent from './pages/calendar/ScheduleContent';
import DragDropSchedule from './pages/calendar/DragDropSchedule';
import CalendarDeadlines from './pages/calendar/CalendarDeadlines';
import Reminders from './pages/calendar/Reminders';
import UpcomingContent from './pages/calendar/UpcomingContent';
import PublishingStatus from './pages/calendar/PublishingStatus';

import CollaborationHub from './pages/collaborations/CollaborationHub';
import Projects from './pages/collaborations/Projects';
import ProjectDetails from './pages/collaborations/ProjectDetails';
import Team from './pages/collaborations/Team';
import Tasks from './pages/collaborations/Tasks';
import Messages from './pages/collaborations/Messages';
import Teams from './pages/collaborations/Teams';
import TeamMembers from './pages/collaborations/TeamMembers';
import Assignments from './pages/collaborations/Assignments';
import CollabDeadlines from './pages/collaborations/CollabDeadlines';
import Comments from './pages/collaborations/Comments';
import ActivityHistory from './pages/collaborations/ActivityHistory';
import ProjectStatus from './pages/collaborations/ProjectStatus';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        <nav className="w-64 bg-primary text-white p-4 overflow-y-auto h-screen shadow-lg sticky top-0 animate-fade-in">
          <h1 className="text-2xl font-bold mb-8 text-accent2 animate-pulse-slow">CreatorOS</h1>
          
          <div className="mb-6">
            <h2 className="text-sm uppercase text-gray-300 font-bold mb-2">Content Calendar</h2>
            <ul className="pl-2 space-y-2">
              <li><Link to="/calendar" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Dashboard</Link></li>
              <li><Link to="/calendar/day" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Daily View</Link></li>
              <li><Link to="/calendar/week" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Weekly View</Link></li>
              <li><Link to="/calendar/month" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Monthly View</Link></li>
              <li><Link to="/calendar/drag-drop" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Drag-and-drop</Link></li>
              <li><Link to="/calendar/deadlines" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Deadlines</Link></li>
              <li><Link to="/calendar/reminders" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Reminders</Link></li>
              <li><Link to="/calendar/upcoming" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Upcoming Content</Link></li>
              <li><Link to="/calendar/publishing-status" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Publishing Status</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm uppercase text-gray-300 font-bold mb-2">Collaboration Hub</h2>
            <ul className="pl-2 space-y-2">
              <li><Link to="/collaborations" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Hub Overview</Link></li>
              <li><Link to="/collaborations/projects" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Projects</Link></li>
              <li><Link to="/collaborations/teams" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Teams</Link></li>
              <li><Link to="/collaborations/team-members" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Team Members</Link></li>
              <li><Link to="/collaborations/tasks" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Tasks</Link></li>
              <li><Link to="/collaborations/assignments" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Assignments</Link></li>
              <li><Link to="/collaborations/collab-deadlines" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Deadlines</Link></li>
              <li><Link to="/collaborations/comments" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Comments</Link></li>
              <li><Link to="/collaborations/activity-history" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Activity History</Link></li>
              <li><Link to="/collaborations/project-status" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Project Status</Link></li>
              <li><Link to="/collaborations/messages" className="hover:text-accent2 block transition-all duration-300 hover:translate-x-2">Messages</Link></li>
            </ul>
          </div>
        </nav>
        <main className="flex-1 p-8 overflow-y-auto h-screen bg-white animate-slide-up">
          <Routes>
            <Route path="/calendar" element={<ContentCalendar />} />
            <Route path="/calendar/day" element={<DayView />} />
            <Route path="/calendar/week" element={<WeekView />} />
            <Route path="/calendar/month" element={<MonthView />} />
            <Route path="/calendar/drag-drop" element={<DragDropSchedule />} />
            <Route path="/calendar/deadlines" element={<CalendarDeadlines />} />
            <Route path="/calendar/reminders" element={<Reminders />} />
            <Route path="/calendar/upcoming" element={<UpcomingContent />} />
            <Route path="/calendar/publishing-status" element={<PublishingStatus />} />
            <Route path="/calendar/schedule" element={<ScheduleContent />} />
            
            <Route path="/collaborations" element={<CollaborationHub />} />
            <Route path="/collaborations/projects" element={<Projects />} />
            <Route path="/collaborations/projects/:id" element={<ProjectDetails />} />
            <Route path="/collaborations/teams" element={<Teams />} />
            <Route path="/collaborations/team-members" element={<TeamMembers />} />
            <Route path="/collaborations/tasks" element={<Tasks />} />
            <Route path="/collaborations/assignments" element={<Assignments />} />
            <Route path="/collaborations/collab-deadlines" element={<CollabDeadlines />} />
            <Route path="/collaborations/comments" element={<Comments />} />
            <Route path="/collaborations/activity-history" element={<ActivityHistory />} />
            <Route path="/collaborations/project-status" element={<ProjectStatus />} />
            <Route path="/collaborations/messages" element={<Messages />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
