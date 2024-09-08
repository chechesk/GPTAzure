const mongoose = require('mongoose');
const { DB_USER, DB_PASSWORD, DB_CLUSTER, DB_NAME } = process.env;

const connectionOptions = {

};

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.usmokk9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, connectionOptions);
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    // Consider implementing retry logic with exponential backoff here
    process.exit(1);
  }
};

// Usage example (assuming connectDB is exported)
connectDB()
  .then(() => {
    // Your application logic here after successful connection
  })
  .catch(error => {
    console.error('Error establishing connection:', error);
  });

module.exports = connectDB; // Optional: Export the connectDB function