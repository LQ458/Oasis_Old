import Generalform from "@/components/generalform/page.jsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route.js";

export default async function general() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <main>
      <Generalform />
    </main>
  );
}
