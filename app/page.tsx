// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700">
      {/* Header ENPO - Version Bleu/Blanc */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* TON LOGO EPC */}
              <img 
                src="/logo_epc_color.png" 
                alt="Logo EPC" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">EPC - ENPO Maurice Audin</h1>
                <p className="text-blue-200 text-sm">Engineering Pioneers Club - École Nationale Polytechnique d'Oran</p>
              </div>
            </div>
            <nav className="flex gap-6">
              <Link href="/" className="text-white hover:text-blue-300 font-semibold">Accueil</Link>
              <Link href="/membres" className="text-white hover:text-blue-300">Membres</Link>
              <Link href="/departements" className="text-white hover:text-blue-300">Départements</Link>
              <Link href="/evenements" className="text-white hover:text-blue-300">Événements</Link>
              <Link href="/projets" className="text-white hover:text-blue-300">Projets</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Version Bleu */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-white mb-6">
          EPC - ENPO Maurice Audin
        </h1>
        <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
          Le club scientifique d'excellence de l'École Nationale Polytechnique d'Oran
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/departements" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 font-semibold text-lg"
          >
            Nos Départements
          </Link>
          <Link 
            href="/projets" 
            className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 font-semibold text-lg"
          >
            Projets ENPO
          </Link>
        </div>
      </section>

      {/* Départements ENPO - Version Bleu */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Départements EPC-ENPO</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* IT */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-blue-300 hover:border-blue-200 transition-all">
            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-white font-bold text-xl">IT</span>
            </div>
            <h3 className="text-xl font-semibold text-white text-center mb-3">Département IT</h3>
            <p className="text-blue-200 text-center text-sm">
              Développement web, applications mobiles, IA
            </p>
          </div>

          {/* Relations */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-blue-300 hover:border-blue-200 transition-all">
            <div className="w-16 h-16 bg-blue-400 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-white font-bold text-xl">RE</span>
            </div>
            <h3 className="text-xl font-semibold text-white text-center mb-3">Relations</h3>
            <p className="text-blue-200 text-center text-sm">
              Partenariats entreprises, communication ENPO
            </p>
          </div>

          {/* Science */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-blue-300 hover:border-blue-200 transition-all">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-white font-bold text-xl">SC</span>
            </div>
            <h3 className="text-xl font-semibold text-white text-center mb-3">Science</h3>
            <p className="text-blue-200 text-center text-sm">
              Recherche, innovation, projets scientifiques
            </p>
          </div>

          {/* Logistique */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-blue-300 hover:border-blue-200 transition-all">
            <div className="w-16 h-16 bg-blue-700 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-white font-bold text-xl">LG</span>
            </div>
            <h3 className="text-xl font-semibold text-white text-center mb-3">Logistique</h3>
            <p className="text-blue-200 text-center text-sm">
              Organisation événements, gestion locaux ENPO
            </p>
          </div>
        </div>
      </section>

      {/* Stats ENPO - Version Bleu */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <h3 className="text-4xl font-bold text-white mb-2">50+</h3>
            <p className="text-blue-200">Étudiants Membres</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <h3 className="text-4xl font-bold text-white mb-2">15+</h3>
            <p className="text-blue-200">Projets Actifs</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <h3 className="text-4xl font-bold text-white mb-2">4</h3>
            <p className="text-blue-200">Départements</p>
          </div>
        </div>
      </section>
    </div>
  );
}