const User = require('../Models/userSchema,');

export default AuthGoogle = async (accessToken, refreshToken, profile, done) => {
    try {
      // Verificar si el usuario ya existe en la base de datos
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        // Si no existe, lo creamos
        user = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName
        });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
}