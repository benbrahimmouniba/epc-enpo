// app/projets/page.tsx
import Link from 'next/link';
import { query } from '@/lib/database';

async function getProjets() {
  try {
    const result = await query('SELECT * FROM projets ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

export default async function ProjetsPage() {
  const projets = await getProjets();

  const getStatutColor = (statut: string) => {
    const colors = {
      'en cours': 'bg-blue-100 text-blue-800',
      'terminé': 'bg-green-100 text-green-800',
      'planifié': 'bg-yellow-100 text-yellow-800',
      'en pause': 'bg-gray-100 text-gray-800'
    };
    return colors[statut as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDepartementColor = (departement: string) => {
    const colors = {
      'IT': 'bg-blue-50 text-blue-700 border-blue-200',
      'Relations': 'bg-green-50 text-green-700 border-green-200',
      'Science': 'bg-purple-50 text-purple-700 border-purple-200',
      'Logistique': 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[departement as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
             <img 
  src="/logo_epc_color.png" 
  alt="Logo EPC" 
  className="w-10 h-10 object-contain"
/>
              <div>
                <h1 className="text-xl font-bold text-gray-800">EPC - ENPO Maurice Audin</h1>
              </div>
            </div>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600">Accueil</Link>
              <Link href="/membres" className="text-gray-700 hover:text-blue-600">Membres</Link>
              <Link href="/departements" className="text-gray-700 hover:text-blue-600">Départements</Link>
              <Link href="/evenements" className="text-gray-700 hover:text-blue-600">Événements</Link>
              <Link href="/projets" className="text-blue-600 font-semibold">Projets</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Projets EPC-ENPO</h1>
            <p className="text-gray-600 mt-2">
              Découvrez les projets innovants de nos étudiants
            </p>
          </div>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
            {projets.length} projet{projets.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projets.map((projet) => (
            <div key={projet.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{projet.titre}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatutColor(projet.statut)}`}>
                    {projet.statut}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{projet.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Domaine:</span>
                    <span className="text-gray-700 font-medium">{projet.domaine}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Département:</span>
                    <span className={`px-2 py-1 rounded text-xs ${getDepartementColor(projet.departement)}`}>
                      {projet.departement}
                    </span>
                  </div>
                  {projet.date_debut && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Début:</span>
                      <span className="text-gray-700">
                        {new Date(projet.date_debut).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      Créé le {new Date(projet.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun projet pour le moment.</p>
            <p className="text-gray-400">Les projets apparaîtront ici une fois créés.</p>
          </div>
        )}
      </main>
    </div>
  );
}