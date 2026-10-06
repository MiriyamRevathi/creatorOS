import React from 'react';
export default function CalendarDeadlines() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-accent2 mb-4">Content Deadlines</h2>
      <ul className="space-y-4">
        <li className="flex justify-between items-center border-b pb-2">
          <div><strong className="text-primary">Thumbnail Design</strong><br/><span className="text-sm text-gray-500">For Python Tutorial</span></div>
          <span className="text-red-500 font-bold">Due Today!</span>
        </li>
        <li className="flex justify-between items-center border-b pb-2">
          <div><strong className="text-primary">Sponsor Integration</strong><br/><span className="text-sm text-gray-500">For Podcast Ep 42</span></div>
          <span className="text-orange-500 font-bold">Due in 2 days</span>
        </li>
      </ul>
    </div>
  );
}
