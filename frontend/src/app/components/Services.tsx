import { Lightbulb, Rocket, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const services = [
  {
    icon: Lightbulb,
    title: 'Diseño Personalizado',
    description: 'Creamos piezas únicas adaptadas a tu estilo y necesidades, perfectas para bailarines y amantes de la moda.',
  },
  {
    icon: Rocket,
    title: 'Colecciones Exclusivas',
    description: 'Lanzamos colecciones limitadas que fusionan arte contemporáneo con funcionalidad para el movimiento.',
  },
  {
    icon: Shield,
    title: 'Alta Calidad',
    description: 'Utilizamos materiales premium y técnicas artesanales que garantizan durabilidad y confort.',
  },
  {
    icon: Zap,
    title: 'Estilo Dinámico',
    description: 'Diseños que se adaptan a tu ritmo de vida, desde el escenario hasta la vida cotidiana.',
  },
];

export function Services() {
  return (
    <section id="coleccion" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Nuestra Propuesta</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cada pieza cuenta una historia de movimiento, creatividad y estilo único
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center mb-4">
                  <service.icon size={24} />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}