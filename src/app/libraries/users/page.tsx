"use client";

import React, { useEffect } from "react";
import { useSession, signOut, SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

const UsersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return null; // or a loading spinner
  }

  return <div>Users Page</div>;
};

const App = () => (
  <SessionProvider>
    <UsersPage />
  </SessionProvider>
);

export default App;
