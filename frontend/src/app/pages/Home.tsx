import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Gallery } from '../components/Gallery';
import { Services } from '../components/Services';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Gallery />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
