export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (email === 'admin@mallupet.com' && password === 'admin123') {
      return Response.json({ 
        user: { email: 'admin@mallupet.com' }, 
        session: { access_token: 'mock_token_123' } 
      });
    }

    return Response.json({ error: 'Credenciais inválidas. Use admin@mallupet.com e senha admin123' }, { status: 401 });
  } catch {
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
