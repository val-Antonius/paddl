import React from 'react';

interface CourtFilterProps {
  courts: string[];
  selectedCourt: string;
  onSelectCourt: (court: string) => void;
}

export const CourtFilter: React.FC<CourtFilterProps> = ({
  courts,
  selectedCourt,
  onSelectCourt
}) => {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCourt('all')}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          selectedCourt === 'all' 
            ? 'bg-indigo-600 text-white shadow-md' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Semua Lapangan
      </button>
      {courts.map(court => (
        <button
          key={court}
          onClick={() => onSelectCourt(court)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            selectedCourt === court 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {court}
        </button>
      ))}
    </div>
  );
};