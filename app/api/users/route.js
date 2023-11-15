import { NextResponse } from "next/server.js";
import User from "../user.js";
import {DBconnect, DBclose } from '../../libs/mongodb';
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';

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

export async function POST(request) {
  try {
    const { username, password, adminCode } = await request.json();
    let indicator = false;

    if (!username || !password) {
      return NextResponse.json({ error: "Username or password missing" }, { status: 400 });
    }

    await DBconnect();

    const adminCodeValue = adminCode;
    const adminStatus = adminCodeValue === 'AiercroftLisa';

    await User.create({ username, password, admin:adminStatus });
    indicator = true;

    return NextResponse.json({ message: "User Created" }, { status: 201 }, {indicator});
  } catch (error) {
    console.error("Error creating user:", error);
    const response = NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    return response;
  } finally {
    await DBclose();
  }
}

export async function GET(request){
    await DBconnect();
    let ind
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (!user) {
        ind = false;
      }
    })
      ind = true;
    NextResponse.json({ind});
    await DBclose();
}