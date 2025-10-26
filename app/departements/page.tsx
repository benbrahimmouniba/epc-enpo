// app/departements/page.tsx
import Link from 'next/link';
import { query } from '@/lib/database';

async function getDepartements() {
  try {
    const result = await query('SELECT * FROM departements ORDER BY id');
    return result.rows;
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

async function getMembresParDepartement() {
  try {
    const result = await query(`
      SELECT departement, COUNT(*) as count 
      FROM membres 
      WHERE departement IS NOT NULL 
      GROUP BY departement
    `);
    return result.rows;
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

export default async function DepartementsPage() {
  const [departements, stats] = await Promise.all([
    getDepartements(),
    getMembresParDepartement()
  ]);

  const getDepartementColor = (nom: string) => {
    const colors = {
      'IT': 'from-blue-500 to-blue-600',
      'Relations': 'from-green-500 to-green-600',
      'Science': 'from-purple-500 to-purple-600',
      'Logistique': 'from-orange-500 to-orange-600'
    };
    return colors[nom as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getDepartementIcon = (nom: string) => {
    const icons = {
      'IT': '💻',
      'Relations': '🤝',
      'Science': '🔬',
      'Logistique': '📦'
    };
    return icons[nom as keyof typeof icons] || '🏢';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">
                EPC
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">EPC - ENPO Maurice Audin</h1>
              </div>
            </div>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-700 hover:text-emerald-600">Accueil</Link>
              <Link href="/membres" className="text-gray-700 hover:text-emerald-600">Membres</Link>
              <Link href="/departements" className="text-emerald-600 font-semibold">Départements</Link>
              <Link href="/evenements" className="text-gray-700 hover:text-emerald-600">Événements</Link>
              <Link href="/projets" className="text-gray-700 hover:text-emerald-600">Projets</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Nos Départements</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les quatre piliers qui font la force du Engineering Pioneers Club - ENPO
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {departements.map((departement) => {
            const membreCount = stats.find(stat => stat.departement === departement.nom)?.count || 0;
            
            return (
              <div key={departement.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className={`bg-gradient-to-r ${getDepartementColor(departement.nom)} p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{getDepartementIcon(departement.nom)}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{departement.nom}</h2>
                        <p className="text-blue-100">{departement.responsable}</p>
                      </div>
                    </div>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                      {membreCount} membre{membreCount > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{departement.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Email:</span>
                      <a href={`mailto:${departement.email}`} className="text-blue-600 hover:text-blue-800">
                        {departement.email}
                      </a>
                    </div>
                    
                    <Link 
                      href={`/membres?departement=${departement.nom}`}
                      className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-center py-2 px-4 rounded-lg transition-colors"
                    >
                      Voir les membres du département
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}