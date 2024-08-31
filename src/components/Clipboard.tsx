import React, { useRef } from 'react';

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
        className="h-10 w-full rounded-[4px] bg-[#f1f3f4] py-3 pl-3 pr-10 font-[Roboto] text-[#202124] text-sm outline-none duration-200"
      />
      <button
        onClick={copyToClipboard}
        className="absolute right-0 top-0 flex h-10 w-10 rounded-full items-center justify-center duration-200 hover:bg-[#dadce0]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#1f1f1f"
        >
          <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
        </svg>
      </button>
    </div>
  );
};

export default Clipboard;
