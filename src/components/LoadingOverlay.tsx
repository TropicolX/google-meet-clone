import React from 'react';
import Spinner from './Spinner';

const LoadingOverlay = () => {
  return (
    <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center gap-4 text-white text-3xl bg-[#000] opacity-90">
      <Spinner />
      <div>Loading...</div>
    </div>
  );
};

export default LoadingOverlay;
