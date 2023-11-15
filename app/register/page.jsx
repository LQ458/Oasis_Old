'use client'
import axios from 'axios';
import { IonIcon } from "@ionic/react";
import {TailSpin} from "react-loader-spinner";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mailOutline, lockClosedOutline, diamondOutline } from "ionicons/icons";
import Link from 'next/link';
import '../src/register.css';
import { NextRequest } from 'next/server';

const register = (req,res) => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
      const response = await axios.post('/api/users', {
        username: username,
        password: password,
        adminCode: adminCode
      });
        router.push('/login');
      setMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      setMessage(error.response.data.error);
        alert("Username has been registered");
        window.location.reload();
    }
  };
  if(req.method === 'GET'){
    useEffect(() => {
        // Fetch initial data or perform actions on component mount (GET request)
        // This could be fetching some data from the server or any other initialization logic
        // ...
    
        // For example, if you want to redirect users after successful registration
        const redirectAfterRegistration = async () => {
          try {
            const response = await axios.get('/api/users'); // replace with your actual endpoint
            const regind = response.ind;
            if(regind == true){
                router.push('/dashboard');
            }
          } catch (error) {
            console.error('Error fetching initial data:', error);
          }
        };
    
        redirectAfterRegistration();
      }, []); // The empty dependency array ensures this effect runs once on component mount
  }
  return (
    <>
      <title>Register</title>
      <section>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={handleSubmit}>
              <h2 className="reg">Register</h2>
              <div className="inputbox">
                <IonIcon icon={mailOutline} />
                <input
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label htmlFor="username">Username:</label>
              </div>
              <div className="inputbox">
                <IonIcon icon={lockClosedOutline} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password">Password:</label>
              </div>
              <div className="inputbox">
                <IonIcon icon={diamondOutline} />
                <input
                  type="text"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  required
                />
                <label htmlFor="adminCode">Code (Pi first three digits):</label>
              </div>
              <button type="submit" className='reg1' disabled={loading}>
              {loading && (
    <>
      <TailSpin type="ThreeDots" color="black" height={20} width={40} style={{ marginRight: '5px' }} />
      <span>Loading...</span>
    </>
  )}
  {!loading && 'Register'}
                </button>
              <div className="register">
                <p>
                  Already have an account? <Link href="/login">Login</Link>
                </p>
                <br />
                <p>© 2023 Oasis. All rights reserved.</p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default register;