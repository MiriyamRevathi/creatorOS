import os

base_dir = r"D:\creator OS\frontend\src"

dirs = [
    "pages/calendar",
    "pages/collaborations",
    "components/calendar",
    "components/collaboration",
    "services"
]

for d in dirs:
    os.makedirs(os.path.join(base_dir, d), exist_ok=True)

# api service
api_js = """const API_BASE = 'http://localhost:5000/api';

export const fetchApi = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!response.ok) {
    throw new Error('API Error');
  }
  return response.json();
};

export const api = {
  calendar: {
    getAll: () => fetchApi('/calendar/'),
    create: (data) => fetchApi('/calendar/', { method: 'POST', body: JSON.stringify(data) }),
  },
  projects: {
    getAll: () => fetchApi('/projects/'),
  },
  tasks: {
    getAll: () => fetchApi('/tasks/'),
  },
  collaborations: {
    getAll: () => fetchApi('/collaborations/'),
  }
};
"""
with open(os.path.join(base_dir, "services", "api.js"), "w") as f: f.write(api_js)

# Simple react components
components = {
    "pages/calendar/ContentCalendar.jsx": "import React from 'react';\nimport { Link } from 'react-router-dom';\n\nexport default function ContentCalendar() {\n  return <div className=\"p-4\">\n    <h1 className=\"text-2xl font-bold text-[#412653]\">Content Calendar</h1>\n    <div className=\"flex gap-4 mt-4\">\n      <Link to=\"day\" className=\"text-[#3F567F]\">Day</Link>\n      <Link to=\"week\" className=\"text-[#3F567F]\">Week</Link>\n      <Link to=\"month\" className=\"text-[#3F567F]\">Month</Link>\n    </div>\n  </div>;\n}",
    "pages/calendar/DayView.jsx": "export default function DayView() { return <div>Day View</div>; }",
    "pages/calendar/WeekView.jsx": "export default function WeekView() { return <div>Week View</div>; }",
    "pages/calendar/MonthView.jsx": "export default function MonthView() { return <div>Month View</div>; }",
    "pages/calendar/ScheduleContent.jsx": "export default function ScheduleContent() { return <div>Schedule Content</div>; }",
    
    "pages/collaborations/CollaborationHub.jsx": "import React from 'react';\nimport { Link } from 'react-router-dom';\n\nexport default function CollaborationHub() {\n  return <div className=\"p-4\">\n    <h1 className=\"text-2xl font-bold text-[#412653]\">Collaboration Hub</h1>\n    <div className=\"flex gap-4 mt-4\">\n      <Link to=\"projects\" className=\"text-[#3F567F]\">Projects</Link>\n      <Link to=\"team\" className=\"text-[#3F567F]\">Team</Link>\n      <Link to=\"tasks\" className=\"text-[#3F567F]\">Tasks</Link>\n      <Link to=\"messages\" className=\"text-[#3F567F]\">Messages</Link>\n    </div>\n  </div>;\n}",
    "pages/collaborations/Projects.jsx": "import React, { useEffect, useState } from 'react';\nimport { api } from '../../services/api';\n\nexport default function Projects() {\n  const [projects, setProjects] = useState([]);\n  useEffect(() => {\n    api.projects.getAll().then(setProjects).catch(console.error);\n  }, []);\n  return <div><h2>Projects</h2><ul>{projects.map(p => <li key={p.id}>{p.title}</li>)}</ul></div>;\n}",
    "pages/collaborations/ProjectDetails.jsx": "export default function ProjectDetails() { return <div>Project Details</div>; }",
    "pages/collaborations/Team.jsx": "export default function Team() { return <div>Team</div>; }",
    "pages/collaborations/Tasks.jsx": "export default function Tasks() { return <div>Tasks</div>; }",
    "pages/collaborations/Messages.jsx": "export default function Messages() { return <div>Messages</div>; }",
}

for path, content in components.items():
    with open(os.path.join(base_dir, path), "w") as f:
        f.write(content)

# App.jsx
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        <nav className="w-64 bg-[#412653] text-white p-4">
          <h1 className="text-2xl font-bold mb-8 text-[#D174D2]">CreatorOS</h1>
          <ul>
            <li className="mb-4"><Link to="/calendar" className="hover:text-[#E0563F]">Calendar</Link></li>
            <li className="mb-4"><Link to="/collaborations" className="hover:text-[#E0563F]">Collaboration</Link></li>
          </ul>
        </nav>
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/calendar" element={<ContentCalendar />} />
            <Route path="/calendar/day" element={<DayView />} />
            <Route path="/calendar/week" element={<WeekView />} />
            <Route path="/calendar/month" element={<MonthView />} />
            <Route path="/calendar/schedule" element={<ScheduleContent />} />
            
            <Route path="/collaborations" element={<CollaborationHub />} />
            <Route path="/collaborations/projects" element={<Projects />} />
            <Route path="/collaborations/projects/:id" element={<ProjectDetails />} />
            <Route path="/collaborations/team" element={<Team />} />
            <Route path="/collaborations/tasks" element={<Tasks />} />
            <Route path="/collaborations/messages" element={<Messages />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
"""

with open(os.path.join(base_dir, "App.jsx"), "w") as f:
    f.write(app_jsx)

print("Frontend setup complete.")
