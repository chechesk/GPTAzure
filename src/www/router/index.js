require('dotenv').config();
const express = require('express')
const ChatGpt = require('../../OpenAi/service')
const server = express()
const authRoutes = require('./auth');
const auth = require('../../middleware/auth');
const passport = require('passport');
const { default: authGoogle } = require('../../middleware/authGoogle');
const userSchema = require('../../Models/userSchema,');
const GoogleStrategy = require('passport-google-oauth20');

server.get('/', (req, res) => {
    res.send('Hello World!')

server.use('/api/auth', authRoutes);
  })

server.post('/', auth, ChatGpt)

passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: 'https://www.example.com/oauth2/redirect/google',
  scope: [ 'profile' ],
  state: true
},
function verify(accessToken, refreshToken, profile, cb) {
  db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
    'https://accounts.google.com',
    profile.id
  ], function(err, cred) {
    if (err) { return cb(err); }
    
    if (!cred) {
      // The account at Google has not logged in to this app before.  Create a
      // new user record and associate it with the Google account.
      db.run('INSERT INTO users (name) VALUES (?)', [
        profile.displayName
      ], function(err) {
        if (err) { return cb(err); }
        
        var id = this.lastID;
        db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
          id,
          'https://accounts.google.com',
          profile.id
        ], function(err) {
          if (err) { return cb(err); }
          
          var user = {
            id: id,
            name: profile.displayName
          };
          return cb(null, user);
        });
      });
    } else {
      // The account at Google has previously logged in to the app.  Get the
      // user record associated with the Google account and log the user in.
      db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        return cb(null, user);
      });
    }
  });
}
));
server.get('/login/google', passport.authenticate('google'));

server.get('/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });

// // Ruta de callback después de la autenticación con Google
// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Si la autenticación es exitosa, genera el token JWT y redirige
//     const token = jwt.sign({ userId: req.user._id }, process.env.SECRET, { expiresIn: '1h' });
//     res.redirect(`http://localhost:3000?token=${token}`); // Redirige al frontend con el token
//   }
// );


module.exports = server