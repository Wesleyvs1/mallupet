import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('ordem', { ascending: true });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data || []);
  } catch {
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Remove campos que o banco gera automaticamente se estiverem presentes
    const { id, created_at, updated_at, ...productData } = body;

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(data, { status: 201 });
  } catch {
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
