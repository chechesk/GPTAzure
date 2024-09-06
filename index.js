require('dotenv').config();
const server = require('./src/www/server')
const PORT = process.env.PORT


server.listen(PORT, () => {
    console.log(`Register Running on HTTP port ${PORT}`);
});