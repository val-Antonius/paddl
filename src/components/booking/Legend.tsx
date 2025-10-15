import React from 'react';

export const Legend: React.FC = () => {
  return (
    <div className="mt-6 bg-white rounded-2xl shadow-lg p-4">
      <div className="flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border-2 border-green-200 rounded"></div>
          <span className="text-gray-600">Tersedia</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-indigo-600 rounded"></div>
          <span className="text-gray-600">Dipilih</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <span className="text-gray-600">Sudah Dibooking</span>
        </div>
      </div>
    </div>
  );
};