import React from 'react';
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
