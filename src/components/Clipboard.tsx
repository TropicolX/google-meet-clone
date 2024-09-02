import React, { useRef } from 'react';

import ContentCopy from './icons/ContentCopy';

interface ClipboardProps {
  value: string;
}

const Clipboard = ({ value }: ClipboardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(inputRef.current.value);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        ref={inputRef}
        onChange={(e) => e.preventDefault()}
        value={value}
        className="h-10 w-full rounded bg-light-gray border border-light-gray py-3 pl-3 pr-10 font-roboto text-meet-black text-sm outline-none duration-200"
      />
      <button
        onClick={copyToClipboard}
        className="absolute right-0 top-0 flex h-10 w-10 rounded-full items-center justify-center duration-200 hover:bg-hairline-gray"
      >
        <ContentCopy />
      </button>
    </div>
  );
};

export default Clipboard;
