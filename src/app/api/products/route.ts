import { getProducts, saveProducts } from '@/lib/mockDb';

export async function GET() {
  try {
    const products = getProducts();
    return Response.json(products.sort((a, b) => a.ordem - b.ordem));
  } catch {
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const products = getProducts();
    
    const newProduct = {
      ...body,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    products.push(newProduct);
    saveProducts(products);

    return Response.json(newProduct, { status: 201 });
  } catch {
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
