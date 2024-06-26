// ClientSessionProvider.tsx
"use client";

import { SessionProvider } from "next-auth/react";

export default function ClientSessionProvider({ children }: { children: React.ReactNode }) {
  console.log("ClientSessionProvider: rendering SessionProvider");
  return <SessionProvider>{children}</SessionProvider>;
}