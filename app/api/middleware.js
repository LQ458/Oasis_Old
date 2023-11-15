import nextConnect from 'next-connect';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import User from './user.js';
import Login from "../pages/login/page.jsx"
import Dashboard from "../dashboard/page.jsx"
import { Strategy as LocalStrategy } from 'passport-local';

const setup = () => {
    const middleware = nextConnect();
    const escapeRegex = (text) => {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };
    // Use bodyParser.urlencoded middleware
middleware.use(bodyParser.urlencoded({ extended: true }));

// Use bodyParser.json middleware
middleware.use(bodyParser.json());

// Use session middleware
middleware.use(session({
  secret: 'aiercroftstigma',
  resave: false,
  saveUninitialized: false
}));

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
middleware.use(passport.initialize());
middleware.use(passport.session());
function checkAuthenticated (req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return(<Login />)
}

function attachUsername (req,next) {
    if (req.isAuthenticated()) {
        req.username = req.user.username;
        req.admin = req.user.admin;
    }
    next();
}

const checkLoginAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return(<Dashboard />)
};
}

export {setup};