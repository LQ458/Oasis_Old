'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IonIcon } from "@ionic/react";
import {TailSpin} from "react-loader-spinner";
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import "@/app/src/login.css";
import { signIn } from "next-auth/react";
import Link from "next/link";

const loginForm = (req,res) => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const [error,setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn("credentials",{
        username,
        password,
        redirect: false,
      })
      if (res.error){
        setLoading(false);
        setError(true);
        setTimeout(() => {
          window.location.reload();
          return;
        }, 3000);
      }
      router.replace("profile");
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Internal Server Error");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <div>
      <title>Login</title>
      <section>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={handleSubmit} id="loginForm">
              <h2>Login</h2>
              <div className="inputbox">
                <IonIcon icon={mailOutline} />
                <input
                  type="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username">Username:</label>
              </div>
              <div className="inputbox">
                <IonIcon icon={lockClosedOutline} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
              </div>
              <button type="submit" className='reg1' disabled={loading}>
              {loading && (
    <>
      <TailSpin type="ThreeDots" color="black" height={20} width={40} style={{ marginRight: '5px' }} />
      <span>Loading...</span>
    </>
  )}
  {!loading && 'Login'}
              </button>
              <div className="register">
              {error && (<p className='error'>Incorrect Username or Password</p>)}
              {!error && (<p>Do not have an account? <Link href="/register">Register</Link></p>)}
                <br />
                <p>© 2023 Oasis. All rights reserved.</p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default loginForm;