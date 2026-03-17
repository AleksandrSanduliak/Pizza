import React from 'react';

const FetchCityError = () => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-6">
      Произошла ошибка при запросе к серверу, повторите попытку позже.
    </div>
  );
};

export default FetchCityError;
