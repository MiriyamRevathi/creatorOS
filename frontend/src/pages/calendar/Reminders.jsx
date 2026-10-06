import React from 'react';
export default function Reminders() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-accent1 mb-4">Reminders</h2>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <p className="text-yellow-700"><strong>Alert:</strong> Don't forget to push the community poll at 5:00 PM!</p>
      </div>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="text-blue-700"><strong>Reminder:</strong> Weekly content strategy meeting in 1 hour.</p>
      </div>
    </div>
  );
}
