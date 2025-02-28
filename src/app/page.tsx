import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/route";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};

export default HomePage;
