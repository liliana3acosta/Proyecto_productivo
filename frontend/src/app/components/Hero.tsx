import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import homeImg from "../../assets/home.png";

export function Hero() {
  return (
    <section id="inicio" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl mb-6">
              Donde el arte y la danza se fusionan con la moda
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Diseños exclusivos que capturan el movimiento, la elegancia y la
              expresión artística en cada prenda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg">
                Ver colección
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Conoce nuestra historia
              </Button>
            </div>
          </div>
          <div className="relative">
            <ImageWithFallback
              src={homeImg}
              alt="Moda y danza"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
