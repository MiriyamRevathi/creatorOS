import React from 'react';
export default function Comments() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-4">Recent Comments & Notes</h2>
      <div className="space-y-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">R</div>
            <span className="font-bold text-sm">Ravi (Editor)</span>
            <span className="text-xs text-gray-400">2 hours ago</span>
          </div>
          <p className="text-gray-700">I've uploaded the V2 render. The audio leveling issue around 4:20 should be fixed now.</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-accent1 text-white flex items-center justify-center font-bold">S</div>
            <span className="font-bold text-sm">Sai (Designer)</span>
            <span className="text-xs text-gray-400">Yesterday</span>
          </div>
          <p className="text-gray-700">Are we going with the red or blue background for the thumbnail A/B test?</p>
        </div>
      </div>
    </div>
  );
}
