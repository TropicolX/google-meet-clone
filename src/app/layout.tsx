import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import AppProvider from "../contexts/AppProvider";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moogle Meet",
  description:
    "Real-time meetings by Moogle. Using your browser, share your video, desktop, and presentations with teammates and customers.",
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
          <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@100;200;300;400;500;600;700;800;900&family=Google+Sans+Display:wght@100;200;300;400;500;600;700;800;900&family=Product+Sans:wght@100;200;300;400;500;600;700;800;900&family=Roboto&family=Google+Symbols:opsz,wght,FILL,GRAD@24,400,0,0&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
            />
          </head>
          <body>{children}</body>
        </html>
      </ClerkProvider>
    </AppProvider>
  );
}
