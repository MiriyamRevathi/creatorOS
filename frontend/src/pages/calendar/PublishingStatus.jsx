import React from 'react';
export default function PublishingStatus() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-4">Publishing Status</h2>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div className="bg-green-500 h-4 rounded-full" style={{width: '75%'}}></div>
      </div>
      <p className="text-gray-600 mb-4">75% of this week's content has been successfully published to platforms.</p>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>Python Tutorial: <span className="text-green-600 font-bold">Published</span></li>
        <li>Newsletter: <span className="text-yellow-600 font-bold">Processing...</span></li>
        <li>Podcast: <span className="text-red-600 font-bold">Failed Sync</span></li>
      </ul>
    </div>
  );
}
