import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL);

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS scores (
      id BIGSERIAL PRIMARY KEY,
      pig_name TEXT NOT NULL,
      country_code CHAR(2) NOT NULL,
      distance INTEGER NOT NULL,
      points INTEGER NOT NULL,
      total INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

const ISO_RE = /^[A-Z]{2}$/;

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  try {
    await ensureTable();

    if (req.method === 'GET') {
      const rows = await sql`
        SELECT pig_name, country_code, distance, points, total, created_at
        FROM scores
        ORDER BY total DESC, created_at ASC
        LIMIT 10
      `;
      return Response.json(rows, { headers: CORS });
    }

    if (req.method === 'POST') {
      const body = await req.json();
      const pigName = String(body.name || '').trim().toUpperCase().slice(0, 10);
      const countryCode = String(body.country || '').trim().toUpperCase();
      const distance = Math.max(0, Math.floor(Number(body.distance)) || 0);
      const points = Math.max(0, Math.floor(Number(body.points)) || 0);

      if (!pigName) {
        return Response.json({ error: 'name required' }, { status: 400, headers: CORS });
      }
      if (!ISO_RE.test(countryCode)) {
        return Response.json({ error: 'invalid country code' }, { status: 400, headers: CORS });
      }

      const total = distance + points;

      await sql`
        INSERT INTO scores (pig_name, country_code, distance, points, total)
        VALUES (${pigName}, ${countryCode}, ${distance}, ${points}, ${total})
      `;

      const rows = await sql`
        SELECT pig_name, country_code, distance, points, total, created_at
        FROM scores
        ORDER BY total DESC, created_at ASC
        LIMIT 10
      `;
      return Response.json(rows, { status: 201, headers: CORS });
    }

    return new Response('Method not allowed', { status: 405, headers: CORS });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: CORS });
  }
};

export const config = {
  path: '/api/scores',
};
