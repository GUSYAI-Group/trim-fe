import { Metadata } from 'next';
import ProductsView from '@/modules/Products/views/ProductsView';

export const metadata: Metadata = {
  title: 'Kelola Produk | TRIM',
};

export default function ProductsPage() {
  return <ProductsView />;
}