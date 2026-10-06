import React from 'react';
export default function Assignments() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-4">My Assignments</h2>
      <div className="space-y-4">
        <div className="p-4 bg-accent1/10 border-l-4 border-accent1 rounded">
           <h3 className="font-bold text-primary">Review final cut for React Tutorial</h3>
           <p className="text-sm text-gray-600 mt-1">Assigned by Ravi • Due Tomorrow</p>
        </div>
        <div className="p-4 bg-gray-50 border-l-4 border-gray-300 rounded">
           <h3 className="font-bold text-gray-700">Approve Sponsor Ad Read</h3>
           <p className="text-sm text-gray-500 mt-1">Assigned by Management • Done</p>
        </div>
      </div>
    </div>
  );
}
