import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// PUT /api/todos/[id]
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { task, status } = await request.json();
    await query({
      query: 'UPDATE todo_list SET task = ?, status = ? WHERE id = ?',
      values: [task, status, params.id],
    });
    return NextResponse.json({ message: 'Todo updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/todos/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await query({
      query: 'DELETE FROM todo_list WHERE id = ?',
      values: [params.id],
    });
    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

