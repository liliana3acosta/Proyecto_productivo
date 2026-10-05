import { ImageWithFallback } from "./figma/ImageWithFallback";
import aboutusImg from "../../assets/image.png";

export function About() {
  return (
    <section id="acerca" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <ImageWithFallback
              src={aboutusImg}
              alt="Estudio de diseño"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl mb-6">Nuestra Historia</h2>
            <p className="text-lg text-gray-600 mb-6">
              Artdance Fashion nació de la pasión por combinar el arte del
              movimiento con el diseño de moda contemporáneo. Fundada por
              bailarines y diseñadores, nuestra marca entiende las necesidades
              de quienes viven y respiran arte.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Cada colección es una celebración del cuerpo en movimiento,
              creando prendas que no solo se ven bien, sino que permiten la
              máxima expresión artística sin comprometer el estilo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
