import React from 'react';

interface ExpandMoreProps {
  width?: number;
  height?: number;
  color?: string;
}

const ExpandMore = ({
  width = 24,
  height = 24,
  color = '#fff',
}: ExpandMoreProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={height}
      width={width}
      fill={color}
    >
      <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
    </svg>
  );
};

export default ExpandMore;
