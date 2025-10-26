// app/api/evenements/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET() {
  try {
    const result = await query('SELECT * FROM evenements ORDER BY date_event DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { titre, description, date_event, lieu, departement } = await request.json();
    
    const result = await query(
      'INSERT INTO evenements (titre, description, date_event, lieu, departement) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [titre, description, date_event, lieu, departement]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}