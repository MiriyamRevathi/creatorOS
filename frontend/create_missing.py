import os

base_dir = r"D:\creator OS\frontend\src"

files_to_create = {
    "components/calendar/CalendarGrid.jsx": "export default function CalendarGrid() { return <div>Calendar Grid Component</div>; }",
    "components/calendar/CalendarEvent.jsx": "export default function CalendarEvent() { return <div>Calendar Event Component</div>; }",
    "components/calendar/DragDropContent.jsx": "export default function DragDropContent() { return <div>Drag Drop Content Component</div>; }",
    "components/calendar/CalendarFilters.jsx": "export default function CalendarFilters() { return <div>Calendar Filters Component</div>; }",
    "components/collaboration/ProjectCard.jsx": "export default function ProjectCard() { return <div>Project Card Component</div>; }",
    "components/collaboration/TaskCard.jsx": "export default function TaskCard() { return <div>Task Card Component</div>; }",
    "components/collaboration/TeamMember.jsx": "export default function TeamMember() { return <div>Team Member Component</div>; }",
    "components/collaboration/ActivityFeed.jsx": "export default function ActivityFeed() { return <div>Activity Feed Component</div>; }",
    "hooks/useCalendar.js": "export function useCalendar() { return {}; }",
    "hooks/useCollaboration.js": "export function useCollaboration() { return {}; }",
    "services/calendarService.js": "export const calendarService = {};",
    "services/collaborationService.js": "export const collaborationService = {};"
}

for filepath, content in files_to_create.items():
    full_path = os.path.join(base_dir, filepath)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w") as f:
        f.write(content)

print("Files created.")
