import React from 'react';
export default function DragDropSchedule() {
  return (
    <div className="p-8 bg-white rounded-lg shadow h-full">
      <h2 className="text-2xl font-bold text-primary mb-4">Drag-and-drop Scheduling</h2>
      <div className="flex gap-4 h-[400px]">
        <div className="w-1/4 bg-gray-50 border border-gray-200 rounded p-4">
          <h3 className="font-bold text-secondary mb-4">Unscheduled Content</h3>
          <div className="p-3 bg-white shadow-sm border border-dashed border-gray-400 cursor-move mb-2">📹 Python Tutorial Part 2</div>
          <div className="p-3 bg-white shadow-sm border border-dashed border-gray-400 cursor-move">🎙️ Podcast Ep 42</div>
        </div>
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded p-4">
          <h3 className="font-bold text-secondary mb-4">Calendar Grid (Drop Here)</h3>
          <div className="grid grid-cols-3 gap-2 h-full">
            <div className="border border-gray-200 bg-white rounded p-2">Mon</div>
            <div className="border border-gray-200 bg-white rounded p-2">Tue</div>
            <div className="border border-gray-200 bg-white rounded p-2">Wed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
