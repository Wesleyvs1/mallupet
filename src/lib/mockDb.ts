import fs from 'fs';
import path from 'path';
import { Product } from './supabase';

const dbPath = path.join(process.cwd(), 'mock_db.json');

export function getProducts(): Product[] {
  if (!fs.existsSync(dbPath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function saveProducts(products: Product[]) {
  fs.writeFileSync(dbPath, JSON.stringify(products, null, 2));
}
