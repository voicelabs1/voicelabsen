import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 pt-40 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-[56px] leading-[1.1] font-normal mb-6">
            Pagina niet gevonden
          </h1>
          <p className="paragraph text-gray-600 mb-12">
            Sorry, we kunnen de pagina die je zoekt niet vinden. Misschien is deze verplaatst of verwijderd.
          </p>
          <Link
            href="/"
            className="bg-[#0063f2] text-white px-8 py-4 rounded-xl hover:bg-[#004dbd] transition-all duration-300 text-[17px] font-medium hover:scale-[1.02] inline-block"
          >
            Terug naar home
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
} 