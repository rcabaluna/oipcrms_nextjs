import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { hash } from "bcrypt";



const HomePage = async () => {
  const session = await getServerSession(authOptions);

  const password = hash('123',12);

  return (
    <div>
      <p>{JSON.stringify(session)}</p>
      <p>{password}</p>
    </div>
  );
};

export default HomePage;
