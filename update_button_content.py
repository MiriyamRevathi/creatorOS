import os

base_dir = r"D:\creator OS\frontend\src"

pages = {
    "pages/calendar/DragDropSchedule.jsx": """import React from 'react';
export default function DragDropSchedule() {
  return (
    <div className="p-8 bg-white rounded-lg shadow h-full">
      <h2 className="text-2xl font-bold text-primary mb-4">Drag-and-drop Scheduling</h2>
      <div className="flex gap-4 h-[400px]">
        <div className="w-1/4 bg-gray-50 border border-gray-200 rounded p-4">
          <h3 className="font-bold text-secondary mb-4">Unscheduled Content</h3>
          <div className="p-3 bg-white shadow-sm border border-dashed border-gray-400 cursor-move mb-2">📹 Python Tutorial Part 2</div>
          <div className="p-3 bg-white shadow-sm border border-dashed border-gray-400 cursor-move">🎙️ Podcast Ep 42</div>
        </div>
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded p-4">
          <h3 className="font-bold text-secondary mb-4">Calendar Grid (Drop Here)</h3>
          <div className="grid grid-cols-3 gap-2 h-full">
            <div className="border border-gray-200 bg-white rounded p-2">Mon</div>
            <div className="border border-gray-200 bg-white rounded p-2">Tue</div>
            <div className="border border-gray-200 bg-white rounded p-2">Wed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
""",
    "pages/calendar/CalendarDeadlines.jsx": """import React from 'react';
export default function CalendarDeadlines() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-accent2 mb-4">Content Deadlines</h2>
      <ul className="space-y-4">
        <li className="flex justify-between items-center border-b pb-2">
          <div><strong className="text-primary">Thumbnail Design</strong><br/><span className="text-sm text-gray-500">For Python Tutorial</span></div>
          <span className="text-red-500 font-bold">Due Today!</span>
        </li>
        <li className="flex justify-between items-center border-b pb-2">
          <div><strong className="text-primary">Sponsor Integration</strong><br/><span className="text-sm text-gray-500">For Podcast Ep 42</span></div>
          <span className="text-orange-500 font-bold">Due in 2 days</span>
        </li>
      </ul>
    </div>
  );
}
""",
    "pages/calendar/Reminders.jsx": """import React from 'react';
export default function Reminders() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-accent1 mb-4">Reminders</h2>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <p className="text-yellow-700"><strong>Alert:</strong> Don't forget to push the community poll at 5:00 PM!</p>
      </div>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="text-blue-700"><strong>Reminder:</strong> Weekly content strategy meeting in 1 hour.</p>
      </div>
    </div>
  );
}
""",
    "pages/calendar/UpcomingContent.jsx": """import React from 'react';
export default function UpcomingContent() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-4">Upcoming Content pipeline</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded">
           <h4 className="font-bold">Next 7 Days</h4>
           <p className="text-3xl text-accent1 mt-2">4 Items</p>
        </div>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded">
           <h4 className="font-bold">Next 30 Days</h4>
           <p className="text-3xl text-secondary mt-2">12 Items</p>
        </div>
      </div>
    </div>
  );
}
""",
    "pages/calendar/PublishingStatus.jsx": """import React from 'react';
export default function PublishingStatus() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-4">Publishing Status</h2>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div className="bg-green-500 h-4 rounded-full" style={{width: '75%'}}></div>
      </div>
      <p className="text-gray-600 mb-4">75% of this week's content has been successfully published to platforms.</p>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>Python Tutorial: <span className="text-green-600 font-bold">Published</span></li>
        <li>Newsletter: <span className="text-yellow-600 font-bold">Processing...</span></li>
        <li>Podcast: <span className="text-red-600 font-bold">Failed Sync</span></li>
      </ul>
    </div>
  );
}
""",
    "pages/collaborations/Teams.jsx": """import React from 'react';
export default function Teams() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-4">Your Teams</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 p-4 rounded bg-gray-50 flex items-center justify-between">
           <span className="font-bold text-secondary">Video Production Team</span>
           <span className="bg-accent1 text-white px-2 py-1 rounded text-xs">4 Members</span>
        </div>
        <div className="border border-gray-200 p-4 rounded bg-gray-50 flex items-center justify-between">
           <span className="font-bold text-secondary">Marketing & SEO</span>
           <span className="bg-accent1 text-white px-2 py-1 rounded text-xs">2 Members</span>
        </div>
      </div>
    </div>
  );
}
""",
    "pages/collaborations/TeamMembers.jsx": """import React from 'react';
export default function TeamMembers() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-4">Team Members directory</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-200 text-gray-600">
            <th className="py-2">Name</th>
            <th className="py-2">Role</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="py-3 font-bold">Ravi Kumar</td>
            <td>Lead Video Editor</td>
            <td><span className="text-green-500">● Online</span></td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3 font-bold">Sai Sharma</td>
            <td>Thumbnail Designer</td>
            <td><span className="text-gray-400">● Offline</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
""",
    "pages/collaborations/Assignments.jsx": """import React from 'react';
export default function Assignments() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-4">My Assignments</h2>
      <div className="space-y-4">
        <div className="p-4 bg-accent1/10 border-l-4 border-accent1 rounded">
           <h3 className="font-bold text-primary">Review final cut for React Tutorial</h3>
           <p className="text-sm text-gray-600 mt-1">Assigned by Ravi • Due Tomorrow</p>
        </div>
        <div className="p-4 bg-gray-50 border-l-4 border-gray-300 rounded">
           <h3 className="font-bold text-gray-700">Approve Sponsor Ad Read</h3>
           <p className="text-sm text-gray-500 mt-1">Assigned by Management • Done</p>
        </div>
      </div>
    </div>
  );
}
""",
    "pages/collaborations/CollabDeadlines.jsx": """import React from 'react';
export default function CollabDeadlines() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-accent2 mb-4">Project Deadlines</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-red-50 text-red-700 p-4 rounded border border-red-200">
          <div className="text-4xl font-bold">2</div>
          <div className="text-sm uppercase tracking-wide mt-1">Overdue</div>
        </div>
        <div className="bg-yellow-50 text-yellow-700 p-4 rounded border border-yellow-200">
          <div className="text-4xl font-bold">5</div>
          <div className="text-sm uppercase tracking-wide mt-1">Due This Week</div>
        </div>
        <div className="bg-green-50 text-green-700 p-4 rounded border border-green-200">
          <div className="text-4xl font-bold">12</div>
          <div className="text-sm uppercase tracking-wide mt-1">On Track</div>
        </div>
      </div>
    </div>
  );
}
""",
    "pages/collaborations/Comments.jsx": """import React from 'react';
export default function Comments() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-4">Recent Comments & Notes</h2>
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">R</div>
            <span className="font-bold text-sm">Ravi (Editor)</span>
            <span className="text-xs text-gray-400">2 hours ago</span>
          </div>
          <p className="text-gray-700">I've uploaded the V2 render. The audio leveling issue around 4:20 should be fixed now.</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-accent1 text-white flex items-center justify-center font-bold">S</div>
            <span className="font-bold text-sm">Sai (Designer)</span>
            <span className="text-xs text-gray-400">Yesterday</span>
          </div>
          <p className="text-gray-700">Are we going with the red or blue background for the thumbnail A/B test?</p>
        </div>
      </div>
    </div>
  );
}
""",
    "pages/collaborations/ActivityHistory.jsx": """import React from 'react';
export default function ActivityHistory() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-6">Activity History Feed</h2>
      <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
        <div className="pl-6 relative">
          <div className="absolute w-3 h-3 bg-accent1 rounded-full -left-[7px] top-1"></div>
          <p className="text-sm text-gray-500 mb-1">10:30 AM</p>
          <p className="text-gray-800"><strong>Ravi</strong> moved task <em>Edit Python Tutorial</em> to <strong>Review</strong>.</p>
        </div>
        <div className="pl-6 relative">
          <div className="absolute w-3 h-3 bg-secondary rounded-full -left-[7px] top-1"></div>
          <p className="text-sm text-gray-500 mb-1">09:15 AM</p>
          <p className="text-gray-800"><strong>Sai</strong> uploaded a new file <em>thumbnail_v2.png</em>.</p>
        </div>
        <div className="pl-6 relative">
          <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[7px] top-1"></div>
          <p className="text-sm text-gray-500 mb-1">Yesterday</p>
          <p className="text-gray-800">Project <strong>AI Tutorial Series</strong> was created.</p>
        </div>
      </div>
    </div>
  );
}
""",
    "pages/collaborations/ProjectStatus.jsx": """import React from 'react';
export default function ProjectStatus() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-6">Project Status: AI Tutorial Series</h2>
      
      <div className="mb-8">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-primary">Overall Progress</span>
          <span className="text-sm font-medium text-primary">60%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-accent1 h-2.5 rounded-full" style={{width: '60%'}}></div>
        </div>
      </div>
      
      <h3 className="font-bold text-secondary mb-3">Milestones</h3>
      <ul className="space-y-2">
        <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Scripting</li>
        <li className="flex items-center gap-2"><span className="text-green-500">✔</span> Filming</li>
        <li className="flex items-center gap-2"><span className="text-yellow-500">⟳</span> Editing (In Progress)</li>
        <li className="flex items-center gap-2"><span className="text-gray-300">○</span> Review</li>
        <li className="flex items-center gap-2"><span className="text-gray-300">○</span> Publishing</li>
      </ul>
    </div>
  );
}
"""
}

for filepath, content in pages.items():
    with open(os.path.join(base_dir, filepath), 'w', encoding='utf-8') as f:
        f.write(content)

app_jsx = """import React from 'react';
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
        <nav className="w-64 bg-primary text-white p-4 overflow-y-auto h-screen shadow-lg sticky top-0">
          <h1 className="text-2xl font-bold mb-8 text-accent1">CreatorOS</h1>
          
          <div className="mb-6">
            <h2 className="text-sm uppercase text-gray-400 font-bold mb-2">Content Calendar</h2>
            <ul className="pl-2 space-y-2">
              <li><Link to="/calendar" className="hover:text-accent2 block transition-colors">Dashboard</Link></li>
              <li><Link to="/calendar/day" className="hover:text-accent2 block transition-colors">Daily View</Link></li>
              <li><Link to="/calendar/week" className="hover:text-accent2 block transition-colors">Weekly View</Link></li>
              <li><Link to="/calendar/month" className="hover:text-accent2 block transition-colors">Monthly View</Link></li>
              <li><Link to="/calendar/drag-drop" className="hover:text-accent2 block transition-colors">Drag-and-drop</Link></li>
              <li><Link to="/calendar/deadlines" className="hover:text-accent2 block transition-colors">Deadlines</Link></li>
              <li><Link to="/calendar/reminders" className="hover:text-accent2 block transition-colors">Reminders</Link></li>
              <li><Link to="/calendar/upcoming" className="hover:text-accent2 block transition-colors">Upcoming Content</Link></li>
              <li><Link to="/calendar/publishing-status" className="hover:text-accent2 block transition-colors">Publishing Status</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm uppercase text-gray-400 font-bold mb-2">Collaboration Hub</h2>
            <ul className="pl-2 space-y-2">
              <li><Link to="/collaborations" className="hover:text-accent2 block transition-colors">Hub Overview</Link></li>
              <li><Link to="/collaborations/projects" className="hover:text-accent2 block transition-colors">Projects</Link></li>
              <li><Link to="/collaborations/teams" className="hover:text-accent2 block transition-colors">Teams</Link></li>
              <li><Link to="/collaborations/team-members" className="hover:text-accent2 block transition-colors">Team Members</Link></li>
              <li><Link to="/collaborations/tasks" className="hover:text-accent2 block transition-colors">Tasks</Link></li>
              <li><Link to="/collaborations/assignments" className="hover:text-accent2 block transition-colors">Assignments</Link></li>
              <li><Link to="/collaborations/collab-deadlines" className="hover:text-accent2 block transition-colors">Deadlines</Link></li>
              <li><Link to="/collaborations/comments" className="hover:text-accent2 block transition-colors">Comments</Link></li>
              <li><Link to="/collaborations/activity-history" className="hover:text-accent2 block transition-colors">Activity History</Link></li>
              <li><Link to="/collaborations/project-status" className="hover:text-accent2 block transition-colors">Project Status</Link></li>
              <li><Link to="/collaborations/messages" className="hover:text-accent2 block transition-colors">Messages</Link></li>
            </ul>
          </div>
        </nav>
        <main className="flex-1 p-8 overflow-y-auto h-screen bg-[#F3F4F6]">
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
"""

with open(os.path.join(base_dir, 'App.jsx'), 'w', encoding='utf-8') as f:
    f.write(app_jsx)

print("Created rich UI content for all buttons.")
