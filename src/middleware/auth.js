require('dotenv').config()

// middleware/auth.js
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({   
 error: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token,   
        process.env.TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = auth;