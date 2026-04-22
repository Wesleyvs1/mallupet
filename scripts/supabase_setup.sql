-- =============================================
-- MALLU PET - Supabase Setup Script
-- Execute este SQL no Supabase SQL Editor
-- =============================================

-- 1. Criar tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome text NOT NULL,
  categoria text NOT NULL,
  descricao text NOT NULL,
  preco text DEFAULT 'Consulte preço',
  imagem text NOT NULL,
  indicacao text DEFAULT 'Cães e Gatos',
  fabricante text DEFAULT 'UCBVET',
  ativo boolean DEFAULT true,
  ordem integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Habilitar RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 3. Política para leitura pública (catalogo do site)
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

-- 4. Política para escrita (apenas autenticados)
CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- 5. Criar bucket de storage para imagens
-- (Faça isso manualmente no painel do Supabase: Storage > New Bucket > "product-images" > Public)

-- 6. Inserir dados iniciais (opcional)
-- INSERT INTO products (nome, categoria, descricao, imagem, indicacao, fabricante, ordem)
-- VALUES (...);
