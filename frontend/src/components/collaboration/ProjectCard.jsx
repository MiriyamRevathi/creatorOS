import React from 'react';

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
