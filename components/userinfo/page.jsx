"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import "@/app/src/userinfo.css";

const UserInfo = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <main className="background">
      <div className="card">
        <div>
          <p className="card-text">
            Username: <span className="blue-text">{session?.user?.name}</span>
          </p>
          <a href="dashboard" className="redi">To Dashboard</a>
        </div>

        <button onClick={() => signOut()} className="logout-btn">
          Log Out
        </button>
      </div>
    </main>
  );
};

export default UserInfo;
