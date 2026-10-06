import React from 'react';
export default function Teams() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-4">Your Teams</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 p-4 rounded bg-gray-50 flex items-center justify-between">
           <span className="font-bold text-secondary">Video Production Team</span>
           <span className="bg-accent1 text-white px-2 py-1 rounded text-xs">4 Members</span>
        </div>
        <div className="border border-gray-200 p-4 rounded bg-gray-50 flex items-center justify-between">
           <span className="font-bold text-secondary">Marketing & SEO</span>
           <span className="bg-accent1 text-white px-2 py-1 rounded text-xs">2 Members</span>
        </div>
      </div>
    </div>
  );
}
