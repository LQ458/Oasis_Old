"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
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
        </div>

        <button onClick={() => signOut()} className="logout-btn">
          Log Out
        </button>
      </div>
    </main>
  );
};

export default UserInfo;
