import React from 'react';

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
