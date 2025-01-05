import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/todos
export async function GET() {
  try {
    const todos = await query({
      query: 'SELECT * FROM todo_list',
    });
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/todos
export async function POST(request: Request) {
  try {
    const { task } = await request.json();
    const result = await query({
      query: 'INSERT INTO todo_list (task) VALUES (?)',
      values: [task],
    });
    return NextResponse.json({ id: result.insertId, task }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

