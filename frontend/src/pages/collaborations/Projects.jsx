import React from 'react';
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
