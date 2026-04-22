import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return Response.json({ error: 'Erro ao fazer login: ' + error.message }, { status: 401 });
    }

    return Response.json({ 
      user: data.user, 
      session: data.session 
    });
  } catch (err) {
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
