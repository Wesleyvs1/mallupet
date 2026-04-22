import { getProducts, saveProducts } from '@/lib/mockDb';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const products = getProducts();
    
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return Response.json({ error: 'Produto não encontrado' }, { status: 404 });
    }
    
    products[index] = {
      ...products[index],
      ...body,
      updated_at: new Date().toISOString(),
    };
    
    saveProducts(products);
    return Response.json(products[index]);
  } catch {
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const products = getProducts();
    
    const filtered = products.filter(p => p.id !== id);
    saveProducts(filtered);
    
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
