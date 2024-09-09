import React from 'react';

interface VisualEffectsProps {
  width?: number;
  height?: number;
}

const VisualEffects = ({ width = 24, height = 24 }: VisualEffectsProps) => {
  return (
    <i
      style={{
        fontSize: `${width}px`,
        lineHeight: `${height}px`,
      }}
      aria-hidden="true"
      className="google-symbols select-none"
    >
      visual_effects
    </i>
  );
};

export default VisualEffects;
