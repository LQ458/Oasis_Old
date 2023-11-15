'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IonIcon } from "@ionic/react";
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import passport from "passport";
import LocalStrategy from "passport-local";
import DBconnect from "../libs/mongodb"
import styles from "../src/login.css";

passport.use(new LocalStrategy(
  async (username, password, done) => {
      try {
          const user = await User.findOne({ username });
          if (!user || user.password !== password) {
              return done(null, false, { message: 'Incorrect username or password' });
          }
          return done(null, user);
      } catch (error) {
          return done(error);
      }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
      const user = await User.findById(id);
      done(null, user);
  } catch (error) {
      done(error);
  }
});

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  DBconnect;

  const handleSubmit = (e) => {
    e.preventDefault();
    passport.authenticate("local", {successRedirect: '/dashboard',
    failureRedirect: '/login'});
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
                  name="username"
                  type="username"
                  required
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username">Username:</label>
              </div>
              <div className="inputbox">
                <IonIcon icon={lockClosedOutline} />
                <input
                  name="password"
                  type="password"
                  required
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
              </div>
              {error && <p className="error">{error}</p>}
              <button>Login</button>
              <div className="register">
                <p>
                  Do not have an account? <a href="register">Register</a>
                </p>
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

export default Login;