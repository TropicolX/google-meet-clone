import React from 'react';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="w-svw h-svh flex items-center justify-center">
      <SignUp />
    </div>
  );
}
