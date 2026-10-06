import React from 'react';
export default function UpcomingContent() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-4">Upcoming Content pipeline</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded">
           <h4 className="font-bold">Next 7 Days</h4>
           <p className="text-3xl text-accent1 mt-2">4 Items</p>
        </div>
        <div className="p-4 bg-gray-50 border border-gray-200 rounded">
           <h4 className="font-bold">Next 30 Days</h4>
           <p className="text-3xl text-secondary mt-2">12 Items</p>
        </div>
      </div>
    </div>
  );
}
