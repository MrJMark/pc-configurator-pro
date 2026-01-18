import { useState, useMemo } from 'react';
import { ProductCategory, categoryNames } from '@/types/product';
import { getProductsByCategory, searchProducts } from '@/data/mockProducts';
import { ProductCard } from './ProductCard';
import { SearchFilters } from './SearchFilters';
import { Package } from 'lucide-react';

interface ProductGridProps {
  category: ProductCategory;
}

export const ProductGrid = ({ category }: ProductGridProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 999999]);

  const products = useMemo(() => {
    let filtered = searchQuery 
      ? searchProducts(searchQuery, category)
      : getProductsByCategory(category);
    
    // Apply price filter
    filtered = filtered.filter(
      (p) => p.mainSeller.price >= priceRange[0] && p.mainSeller.price <= priceRange[1]
    );
    
    return filtered;
  }, [category, searchQuery, priceRange]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          <span className="gradient-text glow-text">{categoryNames[category]}</span>
        </h1>
        <p className="text-muted-foreground">
          Найдено {products.length} товаров
        </p>
      </div>

      {/* Search & Filters */}
      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
      />

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              animationDelay={index * 50}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 animate-fade-in">
          <Package className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Товары не найдены
          </h3>
          <p className="text-muted-foreground">
            Попробуйте изменить параметры поиска или фильтры
          </p>
        </div>
      )}
    </div>
  );
};
