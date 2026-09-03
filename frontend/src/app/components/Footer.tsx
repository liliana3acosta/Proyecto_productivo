import { Facebook, Instagram, Linkedin } from "lucide-react";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TikTok"
    >
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Información */}
          <div>
            <h3 className="text-xl mb-4">Artdance Fashion</h3>
            <p className="text-gray-400">
              Fusionando arte, danza y moda desde 2009.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-xl mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#inicio"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Inicio
                </a>
              </li>

              <li>
                <a
                  href="#coleccion"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Colección
                </a>
              </li>

              <li>
                <a
                  href="#acerca"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Acerca de
                </a>
              </li>

              <li>
                <a
                  href="#contacto"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacidad
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Términos
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="text-xl mb-4">Síguenos</h3>

            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1Bn9zn6pxL/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Facebook size={20} />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@artdance.fashion?_r=1&_t=ZS-99PYo7W2UGi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <TikTokIcon size={20} />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/artdance_fashion?igsi=MTQya2RyeG5veW10OQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Instagram size={20} />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2026 Artdance Fashion. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
