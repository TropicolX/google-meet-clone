import React from 'react';

interface ChatFilledProps {
  width?: number;
  height?: number;
  color?: string;
}

const ChatFilled = ({
  width = 24,
  height = 24,
  color = '#fff',
}: ChatFilledProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      height={height}
      width={width}
      fill={color}
    >
      <path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm160-320h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80Z" />
    </svg>
  );
};

export default ChatFilled;
