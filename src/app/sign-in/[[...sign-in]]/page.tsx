'use client';
import React from 'react';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="w-svw h-svh flex items-center justify-center">
      <SignIn />
    </div>
  );
}
