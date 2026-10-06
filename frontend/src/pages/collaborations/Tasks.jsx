import React from 'react';
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
