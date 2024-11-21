const mongoose = require('mongoose');

// Esquema para el historial de chat
const userHistorySchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  }, // Almacena el ID del usuario (podría ser el ID del usuario autenticado)
  history: [
    {
      message: { type: String, required: true }, // Mensaje del usuario
      response: { type: String, required: true }, // Respuesta del chatbot
      timestamp: { type: Date, default: Date.now } // Timestamp para cada entrada
    }
  ]
});

// Crear el modelo en MongoDB
module.exports = mongoose.model('UserHistory', userHistorySchema);