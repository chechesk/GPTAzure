require('dotenv').config();
const express = require('express')
const ChatGpt = require('../../OpenAi/service')
const server = express()
const authRoutes = require('./auth');
const auth = require('../../middleware/auth');
const passport = require('passport');
const { default: authGoogle } = require('../../middleware/authGoogle');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

server.get('/', (req, res) => {
    res.send('Hello World!')

server.use('/api/auth', authRoutes);
  })

server.post('/', auth, ChatGpt)

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, authGoogle)); // Llama al controlador para manejar la autenticación

// Serializar usuario
passport.serializeUser((user, done) => {
  done(null, user.id); // Serializar el ID del usuario
});

// Deserializar usuario
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Encuentra el usuario por ID
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Ruta para redirigir a Google para iniciar sesión
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Ruta de callback después de la autenticación con Google
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Si la autenticación es exitosa, genera el token JWT y redirige
    const token = jwt.sign({ userId: req.user._id }, process.env.SECRET, { expiresIn: '1h' });
    res.redirect(`http://localhost:3000?token=${token}`); // Redirige al frontend con el token
  }
);


module.exports = server