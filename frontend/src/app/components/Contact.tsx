import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';

export function Contact() {
  return (
    <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Contáctanos</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¿Tienes una idea? ¿Necesitas un diseño personalizado? Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2">
                      Nombre
                    </label>
                    <Input id="name" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="tu@email.com" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntanos cómo podemos ayudarte"
                      rows={5}
                    />
                  </div>
                  <Button className="w-full" size="lg">
                    Enviar mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl mb-2">Email</h3>
                <p className="text-gray-600">info@artdancefashion.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl mb-2">Teléfono</h3>
                <p className="text-gray-600">+34 910 234 567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl mb-2">Showroom</h3>
                <p className="text-gray-600">
                  Calle Velázquez 45<br />
                  28001 Madrid, España
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}