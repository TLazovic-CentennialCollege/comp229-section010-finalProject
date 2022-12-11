let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.login = (req, res, next) => {
    // res.json({test: 1});

    passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            return res.status(404).json({error: {errorCode: 1}});
            // return next(err);
            // req.flash('loginMessage', 'Authentication Error');
            // return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }

            const payload =
            {
                id: user._id.toString(),
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });

            return res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id.toString(),
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken});

            //return res.redirect('/book-list');
        });
    })(req, res, next);
}

module.exports.register = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name === "UserExistsError") {
                return res.status(404).json({error: {errorCode: 1}});
            } else {
                return res.status(404).json({error: {errorCode: 2}});
            }
        }
        else
        {
            // if no error exists, then registration is successful

            return res.json({success: true, msg: 'User Registered Successfully!'});
        }
    });
}

module.exports.logout = (req, res, next) => {
    req.logout();
    res.json({success: true, msg: 'User Successfully Logged out!'});
}

module.exports.update = (req, res, next) => {
    let toUpdate = {
        email: req.body.email,
        displayName: req.body.displayName
    }

    let options = { upsert: false, new: true };
    User.findByIdAndUpdate(req.body.id, { $set: toUpdate }, options, (err, user) => {
        if(err)
        {
            console.log("Error: Updating User");
            return res.status(404).json({error: {errorCode: 1}});
        }
        else
        {
            return res.json({success: true, msg: 'User Updated Successfully!', user: {
                id: user._id.toString(),
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }});
        }
    });
}

