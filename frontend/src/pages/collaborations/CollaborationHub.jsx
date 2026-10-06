import React from 'react';
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
