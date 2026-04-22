import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  preco: string;
  imagem: string;
  indicacao: string;
  fabricante: string;
  ativo: boolean;
  ordem: number;
  created_at: string;
  updated_at: string;
};
