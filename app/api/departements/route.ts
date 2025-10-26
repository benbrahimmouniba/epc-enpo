// app/api/departements/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET() {
  try {
    const result = await query('SELECT * FROM departements ORDER BY id');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}