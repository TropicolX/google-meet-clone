import React from 'react';

interface MeetingPopupProps {}

const MeetingPopup = ({}: MeetingPopupProps) => {
  return (
    <div className="z-[1] h-[305px] bg-white absolute top-auto bottom-0 left-[32px] w-[22.5rem] animate-popup translate-y-[-90px] rounded-lg shadow-[0_1px_2px_0_rgba(60,_64,_67,_.3),_0_2px_6px_2px_rgba(60,_64,_67,_.15)]"></div>
  );
};

export default MeetingPopup;
