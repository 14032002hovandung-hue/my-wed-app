'use server';

import { supabase } from '@/lib/supabase';

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Lỗi lấy danh mục:', error);
    return [];
  }
  return data || [];
}

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Lỗi lấy sản phẩm:', error);
    return [];
  }
  return data || [];
}