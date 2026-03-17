import React from 'react';

function FetchCityLoader() {
  return (
    <div className="inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto" />
        <p className="animate-pulse mt-4 text-gray-600">Загрузка городов...</p>
      </div>
    </div>
  );
}

export default FetchCityLoader;
