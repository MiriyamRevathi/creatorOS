import React from 'react';
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
