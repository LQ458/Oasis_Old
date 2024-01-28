import NewsForm from "@/components/newsForm.jsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { metadata } from "../layout";

export default async function Login() {
  const session = await getServerSession(authOptions);
  metadata.title = "News";

  return (
    <>
      <NewsForm />
    </>
  );
}
