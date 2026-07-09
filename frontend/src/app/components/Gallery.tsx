import { ImageWithFallback } from './figma/ImageWithFallback';

const collections = [
  {
    title: 'Elegancia en Movimiento',
    description: 'Prendas que fluyen contigo',
    image: 'https://images.unsplash.com/photo-1704775990327-90f7c43436fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY2xvdGhpbmclMjBkZXNpZ258ZW58MXx8fHwxNzcxNjI1ODg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Arte Contemporáneo',
    description: 'Expresión en cada detalle',
    image: 'https://images.unsplash.com/photo-1725892604314-5d9c9f363757?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXNoaW9uJTIwbW9kZWx8ZW58MXx8fHwxNzcxNjI1ODg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Performance',
    description: 'Del escenario a la calle',
    image: 'https://images.unsplash.com/photo-1718908721930-31120bc1beb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMGFydGlzdGljJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzcxNjI1ODg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Boutique Collection',
    description: 'Exclusividad y estilo',
    image: 'https://images.unsplash.com/photo-1760287363707-851f4780b98c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYm91dGlxdWUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzE1MjY3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function Gallery() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Colecciones Destacadas</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora nuestras líneas más populares donde la moda encuentra al arte
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <ImageWithFallback
                src={collection.image}
                alt={collection.title}
                className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl mb-2">{collection.title}</h3>
                  <p className="text-gray-200">{collection.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
