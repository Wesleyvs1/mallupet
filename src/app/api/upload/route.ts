export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return Response.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Retorna a imagem em formato Base64 para não depender de banco/storage real nos testes locais
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    return Response.json({ 
      url: base64,
      path: 'mock_path' 
    });
  } catch {
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
