import { Cpu, Github } from 'lucide-react';
import { useConfiguratorStore } from '@/store/configuratorStore';

export const Header = () => {
  const { items, getTotalPrice } = useConfiguratorStore();
  const itemCount = items.size;
  const totalPrice = getTotalPrice();

  return (
    <header className="glass sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center animate-pulse-glow">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">PCBuilder</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Конфигуратор ПК</p>
            </div>
          </div>

          {/* Cart Summary */}
          {itemCount > 0 && (
            <div className="flex items-center gap-4 animate-fade-in">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-muted-foreground">В конфигураторе</p>
                <p className="text-sm font-semibold text-foreground">
                  {itemCount} компонент{itemCount === 1 ? '' : itemCount < 5 ? 'а' : 'ов'}
                </p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-primary/20 border border-primary/30">
                <p className="text-sm font-bold text-primary">
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
