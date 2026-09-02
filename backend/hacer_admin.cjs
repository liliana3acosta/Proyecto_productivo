const mongoose = require('mongoose');
require('dotenv').config();

async function hacerAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // CAMBIA TU CORREO AQUÍ ABAJO:
    const correo = "juanpa@gmail.com"; 
    
    const resultado = await mongoose.connection.collection('users').updateOne(
      { email: correo },
      { $set: { rol: 'admin' } }
    );

    if (resultado.modifiedCount > 0 || resultado.matchedCount > 0) {
      console.log('¡Listo! Usuario actualizado a admin exitosamente.');
    } else {
      console.log('No se encontró ningún usuario con ese correo. Revisa que esté bien escrito.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

hacerAdmin();