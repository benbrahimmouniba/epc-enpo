// app/api/projets/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET() {
  try {
    const result = await query('SELECT * FROM projets ORDER BY created_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { titre, description, domaine, departement, statut, date_debut } = await request.json();
    
    const result = await query(
      'INSERT INTO projets (titre, description, domaine, departement, statut, date_debut) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [titre, description, domaine, departement, statut, date_debut]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}