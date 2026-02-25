"use client";
import { ReactNode, use } from "react";

import MeetProvider from "@/contexts/MeetProvider";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{
    meetingId: string;
  }>;
};

export default function Layout({ children, params }: LayoutProps) {
  const { meetingId } = use(params);
  return <MeetProvider meetingId={meetingId}>{children}</MeetProvider>;
}
