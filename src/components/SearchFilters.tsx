import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

export const SearchFilters = ({
  searchQuery,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
}: SearchFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-12 py-3 rounded-xl bg-card/60 border border-border/50 backdrop-blur-xl 
                     text-foreground placeholder:text-muted-foreground
                     focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20
                     transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary transition-colors"
          >
            <X size={16} className="text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Filters Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            showFilters
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary hover:bg-secondary/80 text-foreground'
          }`}
        >
          <SlidersHorizontal size={18} />
          <span>Фильтры</span>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="glass rounded-xl p-4 animate-scale-in">
          <h4 className="text-sm font-medium text-foreground mb-4">Цена</h4>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">От</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border/50 text-foreground
                           focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="0"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">До</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                className="w-full px-3 py-2 rounded-lg bg-input border border-border/50 text-foreground
                           focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="999999"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
