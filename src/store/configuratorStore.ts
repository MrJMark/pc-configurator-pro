import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ConfiguratorItem, ProductCategory, Product, Seller } from '@/types/product';

interface ConfiguratorState {
  items: Map<ProductCategory, ConfiguratorItem>;
  addItem: (category: ProductCategory, product: Product, seller: Seller) => void;
  removeItem: (category: ProductCategory) => void;
  clearAll: () => void;
  getTotalPrice: () => number;
  getItemsArray: () => ConfiguratorItem[];
}

export const useConfiguratorStore = create<ConfiguratorState>()(
  persist(
    (set, get) => ({
      items: new Map(),
      
      addItem: (category, product, seller) => {
        set((state) => {
          const newItems = new Map(state.items);
          newItems.set(category, { category, product, seller });
          return { items: newItems };
        });
      },
      
      removeItem: (category) => {
        set((state) => {
          const newItems = new Map(state.items);
          newItems.delete(category);
          return { items: newItems };
        });
      },
      
      clearAll: () => {
        set({ items: new Map() });
      },
      
      getTotalPrice: () => {
        const items = get().items;
        let total = 0;
        items.forEach((item) => {
          total += item.seller.price;
        });
        return total;
      },
      
      getItemsArray: () => {
        return Array.from(get().items.values());
      },
    }),
    {
      name: 'pc-configurator-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          return {
            ...parsed,
            state: {
              ...parsed.state,
              items: new Map(parsed.state.items),
            },
          };
        },
        setItem: (name, value) => {
          const toStore = {
            ...value,
            state: {
              ...value.state,
              items: Array.from(value.state.items.entries()),
            },
          };
          localStorage.setItem(name, JSON.stringify(toStore));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
