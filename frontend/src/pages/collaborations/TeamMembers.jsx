import React from 'react';
export default function TeamMembers() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-primary mb-4">Team Members directory</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-200 text-gray-600">
            <th className="py-2">Name</th>
            <th className="py-2">Role</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="py-3 font-bold">Ravi Kumar</td>
            <td>Lead Video Editor</td>
            <td><span className="text-green-500">● Online</span></td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3 font-bold">Sai Sharma</td>
            <td>Thumbnail Designer</td>
            <td><span className="text-gray-400">● Offline</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
