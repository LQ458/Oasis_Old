"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import "@/app/src/userinfo.css";

const UserInfo = () => {
  const { data: session } = useSession();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if(session){
      setLoad(false);
    }
  })

  return (
    <main className="background">
      <div className="card">
        <div>
          <p className="card-text">
            Username: {
              load ?  <span className="blue-text">Loading...</span> :
              <span className="blue-text">{session?.user?.name}</span>
              }
          </p>
          <a href="dashboard" className="redi">
            To Dashboard
          </a>
        </div>

        <button onClick={() => signOut()} className="logout-btn">
          Log Out
        </button>
      </div>
    </main>
  );
};

export default UserInfo;
