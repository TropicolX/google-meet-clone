import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';

import AppProvider from '../contexts/AppProvider';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'stream-chat-react/dist/css/v2/index.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Moogle Meet',
  description:
    'Real-time meetings by Moogle. Using your browser, share your video, desktop, and presentations with teammates and customers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <ClerkProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </ClerkProvider>
    </AppProvider>
  );
}
