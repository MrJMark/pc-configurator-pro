import { useState } from 'react';
import { ProductCategory } from '@/types/product';
import { Header } from '@/components/Header';
import { CategoryNav } from '@/components/CategoryNav';
import { ProductGrid } from '@/components/ProductGrid';
import { Configurator } from '@/components/Configurator';
import { HeroSection } from '@/components/HeroSection';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'configurator'>('configurator');

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <Header />

      <main className="relative z-10">
        {activeCategory === 'configurator' && <HeroSection />}
        
        <div className="container mx-auto px-4 py-6">
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="mt-6">
            {activeCategory === 'configurator' ? (
              <Configurator />
            ) : (
              <ProductGrid category={activeCategory} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass border-t border-border/50 mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 PCBuilder. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
