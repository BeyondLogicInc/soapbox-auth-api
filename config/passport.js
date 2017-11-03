const passport = require('passport');
const request = require('request');
const get = require('lodash/get');
const head = require('lodash/head');
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:3000/login/facebook/return",
    profileFields: ['name','emails','link','gender'],
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    var fbProfileDetails = {};
    fbProfileDetails.id = profile.id;
    fbProfileDetails.accessToken = accessToken;
    fbProfileDetails.name = profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
    fbProfileDetails.gender = profile.gender || profile._json.gender;
    fbProfileDetails.picture = profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
    fbProfileDetails.email = get(head(profile.emails), 'value', '');
    done(null, fbProfileDetails);
}));

/**
 * Sign in with Google.
 */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/login/google/return",
    passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
    var googleProfileDetails = {};
    googleProfileDetails.id = profile.id;
    googleProfileDetails.name = profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`;
    googleProfileDetails.accessToken = accessToken;
    googleProfileDetails.gender = profile.gender || profile._json.gender;
    googleProfileDetails.picture = profile._json.image.url;
    googleProfileDetails.email = get(head(profile.emails), 'value', '');
    done(null, googleProfileDetails);
}));

/**
 * Sign in with Twitter.
 */
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "http://localhost:3000/login/github/return",
    passReqToCallback: true,
}, (req, accessToken, tokenSecret, profile, done) => {
    var githubProfileDetails = {};
    githubProfileDetails.id = profile.id;
    githubProfileDetails.accessToken = accessToken;
    githubProfileDetails.name = profile.displayName || profile._json.name;
    githubProfileDetails.gender = profile.gender || profile._json.gender;
    githubProfileDetails.picture = profile._json.avatar_url;
    githubProfileDetails.email = get(head(profile.emails), 'value', '') || profile._json.email;
    done(null, githubProfileDetails);
}));
