import React from 'react';
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
