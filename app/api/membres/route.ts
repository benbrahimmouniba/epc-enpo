// app/api/membres/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET() {
  try {
    const result = await query('SELECT * FROM membres ORDER BY date_inscription DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { nom, email, filiere, niveau, role, departement, competence } = await request.json();
    
    const result = await query(
      'INSERT INTO membres (nom, email, filiere, niveau, role, departement, competence) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nom, email, filiere, niveau, role, departement, competence]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}