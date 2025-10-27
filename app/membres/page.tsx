// app/membres/page.tsx
import Link from 'next/link';
import { query } from '@/lib/database';

async function getMembres(departement?: string) {
  try {
    let sql = 'SELECT * FROM membres';
    const params = [];
    
    if (departement) {
      sql += ' WHERE departement = $1';
      params.push(departement);
    }
    
    sql += ' ORDER BY date_inscription DESC';
    
    const result = await query(sql, params);
    return result.rows;
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

async function getStatsDepartements() {
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

export default async function MembresPage({ searchParams }: { searchParams: { departement?: string } }) {
  const [membres, stats] = await Promise.all([
    getMembres(searchParams.departement),
    getStatsDepartements()
  ]);

  const getDepartementColor = (departement: string) => {
    const colors = {
      'IT': 'bg-blue-100 text-blue-800',
      'Relations': 'bg-green-100 text-green-800', 
      'Science': 'bg-purple-100 text-purple-800',
      'Logistique': 'bg-orange-100 text-orange-800'
    };
    return colors[departement as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
              <Link href="/membres" className="text-blue-600 font-semibold">Membres</Link>
              <Link href="/departements" className="text-gray-700 hover:text-blue-600">Départements</Link>
              <Link href="/evenements" className="text-gray-700 hover:text-blue-600">Événements</Link>
              <Link href="/projets" className="text-gray-700 hover:text-blue-600">Projets</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {searchParams.departement ? `Membres - ${searchParams.departement}` : 'Membres EPC-ENPO'}
            </h1>
            <p className="text-gray-600 mt-2">
              Étudiants de l'ENPO Maurice Audin membres du club
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
              {membres.length} membre{membres.length > 1 ? 's' : ''}
            </span>
            {searchParams.departement && (
              <Link 
                href="/membres"
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300"
              >
                Voir tous
              </Link>
            )}
          </div>
        </div>

        {/* Filtres départements */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Filtrer par département:</h3>
          <div className="flex flex-wrap gap-2">
            <Link 
              href="/membres"
              className={`px-4 py-2 rounded-lg ${
                !searchParams.departement 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Tous ({membres.length})
            </Link>
            {stats.map((stat) => (
              <Link
                key={stat.departement}
                href={`/membres?departement=${stat.departement}`}
                className={`px-4 py-2 rounded-lg ${
                  searchParams.departement === stat.departement
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {stat.departement} ({stat.count})
              </Link>
            ))}
          </div>
        </div>

        {/* Liste membres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {membres.map((membre) => (
            <div key={membre.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">
                    {membre.nom.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{membre.nom}</h3>
                <p className="text-blue-600 mb-1">{membre.role}</p>
                <p className="text-gray-500 text-sm mb-2">{membre.filiere} - {membre.niveau}</p>
                {membre.departement && (
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${getDepartementColor(membre.departement)}`}>
                    {membre.departement}
                  </span>
                )}
                <p className="text-gray-600 text-sm mb-4">{membre.email}</p>
                {membre.competence && (
                  <p className="text-gray-500 text-sm">
                    <strong>Compétences:</strong> {membre.competence}
                  </p>
                )}
                <p className="text-gray-400 text-xs mt-3">
                  Membre depuis {new Date(membre.date_inscription).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {membres.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun membre trouvé.</p>
          </div>
        )}
      </main>
    </div>
  );
}