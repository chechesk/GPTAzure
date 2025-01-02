const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento con multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads/')); // Carpeta de destino
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configuración de multer
const upload = multer({ storage: storage });

// Controlador para manejar la carga
module.exports = (req, res) => {
  // Middleware de multer para manejar un solo archivo
  const uploadSingle = upload.single('image'); // 'image' debe coincidir con el nombre del campo del formulario

  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al cargar el archivo.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No se ha seleccionado ningún archivo.' });
    }

    const fileName = req.file.filename;

    // Puedes hacer cualquier procesamiento adicional aquí

    // Devolver el nombre del archivo como un string al frontend
    res.json({ fileName });
  });
};
