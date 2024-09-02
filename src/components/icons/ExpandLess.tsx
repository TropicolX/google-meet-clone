import React from 'react';

interface ExpandLessProps {
  width?: number;
  height?: number;
  color?: string;
}

const ExpandLess = ({
  width = 24,
  height = 24,
  color = '#fff',
}: ExpandLessProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={height}
      width={width}
      fill={color}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z" />
    </svg>
  );
};

export default ExpandLess;
