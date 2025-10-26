// app/evenements/page.tsx
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Evenement {
  id: number;
  titre: string;
  description: string;
  date_event: string;
  lieu: string;
  departement: string;
}

export default function EvenementsPage() {
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvenements() {
      try {
        const response = await fetch('/api/evenements');
        const data = await response.json();
        setEvenements(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvenements();
  }, []);

  const evenementsFuturs = evenements.filter(
    event => new Date(event.date_event) >= new Date()
  ).sort((a, b) => new Date(a.date_event).getTime() - new Date(b.date_event).getTime());

  const evenementsPasses = evenements.filter(
    event => new Date(event.date_event) < new Date()
  ).sort((a, b) => new Date(b.date_event).getTime() - new Date(a.date_event).getTime());

  const getDepartementColor = (departement: string) => {
    const colors = {
      'IT': 'border-blue-500',
      'Relations': 'border-green-500',
      'Science': 'border-purple-500',
      'Logistique': 'border-orange-500'
    };
    return colors[departement as keyof typeof colors] || 'border-gray-500';
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
              <Link href="/departements" className="text-gray-700 hover:text-emerald-600">Départements</Link>
              <Link href="/evenements" className="text-emerald-600 font-semibold">Événements</Link>
              <Link href="/projets" className="text-gray-700 hover:text-emerald-600">Projets</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Événements EPC-ENPO</h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Chargement des événements...</p>
          </div>
        ) : (
          <>
            {/* Événements à venir */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-green-600 mb-6">
                Événements à venir ({evenementsFuturs.length})
              </h2>
              <div className="grid gap-6">
                {evenementsFuturs.map((event) => (
                  <div key={event.id} className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${getDepartementColor(event.departement)}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{event.titre}</h3>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {event.departement}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>📅 {new Date(event.date_event).toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                      <span>📍 {event.lieu}</span>
                    </div>
                  </div>
                ))}
              </div>
              {evenementsFuturs.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  Aucun événement à venir pour le moment.
                </p>
              )}
            </section>

            {/* Événements passés */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-600 mb-6">
                Événements passés ({evenementsPasses.length})
              </h2>
              <div className="grid gap-6">
                {evenementsPasses.map((event) => (
                  <div key={event.id} className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${getDepartementColor(event.departement)} opacity-75`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{event.titre}</h3>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {event.departement}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>📅 {new Date(event.date_event).toLocaleDateString('fr-FR')}</span>
                      <span>📍 {event.lieu}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}