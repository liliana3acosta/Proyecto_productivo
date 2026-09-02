const mongoose = require('mongoose');
require('dotenv').config();

const productSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  categoria: String,
  imagenes: [String], // <-- Cambiado a arreglo en plural
  stock: Number,
  talla: [String],    // <-- Coincide con tu frontend
  colores: [String]
});

const Product = mongoose.model('Product', productSchema);

const productosArtDance = [
  {
    nombre: "Tutu clásico de ensayo",
    descripcion: "Corto, rígido y horizontal que se abre como plato. Ideal para ensayos profesionales.",
    precio: 350000,
    categoria: "Tutus y leotardos",
    imagenes: ["http://localhost:3000/uploads/Tutu_clasico_de_ensayo.jpeg"],
    stock: 10,
    talla: ["S", "M", "L"],
    colores: ["Blanco", "Negro"]
  },
  {
    nombre: "Tutu Clásico infantil de ensayo",
    descripcion: "Corto básico plisado diseñado especialmente para niñas.",
    precio: 250000,
    categoria: "Tutus y leotardos",
    imagenes: ["http://localhost:3000/uploads/Tutu_clasico_infantil_de_ensayo.jpeg"],
    stock: 15,
    talla: ["2", "4", "6", "8", "10"],
    colores: ["Blanco", "Rosa"]
  },
  {
    nombre: "Tutu romántico de ensayo",
    descripcion: "Largo y vaporoso para ensayos de ballet clásico y contemporáneo.",
    precio: 350000,
    categoria: "Tutus y leotardos",
    imagenes: ["http://localhost:3000/uploads/Tutu_romantico_de_ensayo.jpeg"],
    stock: 10,
    talla: ["S", "M", "L"],
    colores: ["Blanco"]
  },
  {
    nombre: "Maillot o leotardo básico",
    descripcion: "Prenda ajustada de una sola pieza que cubre el torso. Mezcla de nailon, tactel y spandex (lycra).",
    precio: 150000,
    categoria: "Tutus y leotardos",
    imagenes: ["http://localhost:3000/uploads/Maillot_o_leotardo_o_trusa_o_body_basico.jpeg"],
    stock: 20,
    talla: ["S", "M", "L"],
    colores: ["Blanco", "Negro", "Rosa"]
  },
  {
    nombre: "Maillot hombre manga corta",
    descripcion: "Prenda ajustada de una sola pieza para hombre. Mezcla de nailon, tactel y spandex.",
    precio: 200000,
    categoria: "Tutus y leotardos",
    imagenes: ["http://localhost:3000/uploads/Maillot_o_leotardo_o_trusa_o_body_basico_hombre_manga_corta.jpeg"],
    stock: 10,
    talla: ["S", "M", "L"],
    colores: ["Negro"]
  },
  {
    nombre: "Maillot infantil básico manga corta",
    descripcion: "Prenda ajustada infantil de una sola pieza. Material nailon, tactel y spandex.",
    precio: 100000,
    categoria: "Tutus y leotardos",
    imagenes: ["http://localhost:3000/uploads/Maillot_o_leotardo_o_trusa_o_body_infantil_basico_Manga_corta.jpeg"],
    stock: 15,
    talla: ["2", "4", "6", "8", "10"],
    colores: ["Negro", "Blanco", "Rosa"]
  },
  {
    nombre: "Calentadoras largas",
    descripcion: "Accesorio sin pie para usar en las piernas para mantener los músculos calientes. Material de punto o lana.",
    precio: 100000,
    categoria: "Accesorios",
    imagenes: ["http://localhost:3000/uploads/Calentadoras_largas.jpeg"],
    stock: 25,
    talla: ["S", "M", "L"],
    colores: ["Negro", "Gris"]
  },
  {
    nombre: "Calentadoras cortas",
    descripcion: "Accesorio de punto o lana sin pie corto para piernas.",
    precio: 100000,
    categoria: "Accesorios",
    imagenes: ["http://localhost:3000/uploads/Calentadoras_cortas.jpeg"],
    stock: 25,
    talla: ["S", "M", "L"],
    colores: ["Negro", "Rosa"]
  },
  {
    nombre: "Botas Térmicas",
    descripcion: "Botas acolchadas térmicas y ultraligeras que se colocan sobre las zapatillas de punta.",
    precio: 395000,
    categoria: "Accesorios",
    imagenes: ["http://localhost:3000/uploads/Botas_Termicas.jpeg"],
    stock: 10,
    talla: ["32", "34", "36", "38", "40"],
    colores: ["Negro", "Rosa"]
  },
  {
    nombre: "Medias de Ballet (mallas)",
    descripcion: "Elásticas con pie para puntas, hechas en microfibra de alta calidad.",
    precio: 60000,
    categoria: "Accesorios",
    imagenes: ["http://localhost:3000/uploads/Medias_de_Ballet_mallas.jpeg"],
    stock: 30,
    talla: ["S", "M", "L", "XL"],
    colores: ["Rosa ballet", "Blanco"]
  },
  {
    nombre: "Medias de Ballet (mallas) niña",
    descripcion: "Elásticas con pie para puntas en microfibra para niñas.",
    precio: 60000,
    categoria: "Accesorios",
    imagenes: ["http://localhost:3000/uploads/Medias_de_Ballet_mallas.jpeg"],
    stock: 30,
    talla: ["2", "4", "6", "8", "10", "12"],
    colores: ["Rosa ballet"]
  },
  {
    nombre: "Medias de Ballet (mallas) Hombre",
    descripcion: "Elásticas especiales para hombre en microfibra resistente.",
    precio: 150000,
    categoria: "Accesorios",
    imagenes: ["http://localhost:3000/uploads/Medias_de_Ballet_mallasHombre.jpeg"],
    stock: 15,
    talla: ["S", "M", "L", "XL"],
    colores: ["Blanco", "Negro"]
  },
  {
    nombre: "Camisetas blancas hombre",
    descripcion: "Camiseta básica 100% algodón para ensayos.",
    precio: 30000,
    categoria: "Ropa",
    imagenes: ["http://localhost:3000/uploads/Camisetas_blancas_hombre.jpeg"],
    stock: 20,
    talla: ["S", "M", "L"],
    colores: ["Blanco"]
  },
  {
    nombre: "Camisetas blancas mujer",
    descripcion: "Camiseta básica de algodón corte de mujer.",
    precio: 30000,
    categoria: "Ropa",
    imagenes: ["http://localhost:3000/uploads/Camisetas_blancas_mujer.jpeg"],
    stock: 20,
    talla: ["S", "M", "L"],
    colores: ["Blanco"]
  },
  {
    nombre: "Camisetas blancas niña",
    descripcion: "Camiseta básica 100% algodón para niñas.",
    precio: 30000,
    categoria: "Ropa",
    imagenes: ["http://localhost:3000/uploads/Camisetas_blancas_nina.jpeg"],
    stock: 20,
    talla: ["4", "6", "8", "10", "12"],
    colores: ["Blanco"]
  },
  {
    nombre: "Media punta Ballet",
    descripcion: "Material lona elástica (canvas stretch) o tradicional con suelas partidas.",
    precio: 60000,
    categoria: "Calzado",
    imagenes: ["http://localhost:3000/uploads/Media_punta_Ballet.jpeg"],
    stock: 40,
    talla: ["28", "30", "32", "34", "36", "38", "40", "42"],
    colores: ["Rosa", "Negro", "Canela"]
  },
  {
    nombre: "Tutus plato gala básico",
    descripcion: "Corto, rígido y horizontal que se abre como plato con estructura de múltiples capas de tul.",
    precio: 1300000,
    categoria: "Tutus de Gala",
    imagenes: ["http://localhost:3000/uploads/Tutu_plato_gala_basico.jpeg"],
    stock: 5,
    talla: ["S", "M", "L"],
    colores: ["A elegir"]
  },
  {
    nombre: "Tutu romántico de gala básico",
    descripcion: "Largo vaporoso en tul suave o tul ilusión para presentaciones estelares.",
    precio: 1300000,
    categoria: "Tutus de Gala",
    imagenes: ["http://localhost:3000/uploads/Tutu_romantico_de_gala_basico.jpeg"],
    stock: 5,
    talla: ["S", "M", "L"],
    colores: ["A elegir"]
  }
];

async function poblarProductos() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado...');

    await Product.deleteMany({});
    await Product.insertMany(productosArtDance);
    console.log('¡Productos e imágenes (en array) actualizados exitosamente!');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

poblarProductos();