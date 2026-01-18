import { useConfiguratorStore } from '@/store/configuratorStore';
import { ProductCategory, categoryNames } from '@/types/product';
import { Trash2, ExternalLink, ShoppingCart, Sparkles, Cpu, CircuitBoard, MemoryStick, Monitor, HardDrive, Zap, Wind, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categoryOrder: ProductCategory[] = [
  'cpu',
  'motherboard',
  'ram',
  'gpu',
  'ssd',
  'psu',
  'cooling',
  'case',
];

export const Configurator = () => {
  const { items, removeItem, clearAll, getTotalPrice, getItemsArray } = useConfiguratorStore();
  const totalPrice = getTotalPrice();
  const itemsArray = getItemsArray();

  return (
    <div className="space-y-6" id="configurator">
      {/* Header */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text glow-text">Конфигуратор ПК</span>
        </h1>
        <p className="text-muted-foreground">
          Соберите свой идеальный компьютер
        </p>
      </motion.div>

      {/* Configuration Grid */}
      <div className="grid gap-4">
        {categoryOrder.map((category, index) => {
          const item = items.get(category);
          
          return (
            <motion.div
              key={category}
              className={`glass rounded-xl p-4 transition-all duration-300 ${
                item ? 'border-primary/30 shadow-[0_0_20px_hsl(187_100%_50%/0.15)]' : ''
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  {/* Category Icon */}
                  <motion.div 
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item ? 'bg-primary/20' : 'bg-secondary'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {getCategoryIcon(category)}
                  </motion.div>
                  
                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {categoryNames[category]}
                    </h3>
                    <AnimatePresence mode="wait">
                      {item ? (
                        <motion.div
                          key="selected"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p className="font-semibold text-foreground truncate">
                            {item.product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                              {item.seller.name}
                            </span>
                            <span className="text-sm font-bold text-primary">
                              {item.seller.price.toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.p 
                          key="empty"
                          className="text-sm text-muted-foreground italic"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Не выбрано
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Actions */}
                <AnimatePresence>
                  {item && (
                    <motion.div 
                      className="flex items-center gap-2 flex-shrink-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <motion.button
                        onClick={() => window.open(item.seller.url, '_blank')}
                        className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                        title="Посмотреть"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink size={18} />
                      </motion.button>
                      <motion.button
                        onClick={() => removeItem(category)}
                        className="p-2 rounded-lg bg-destructive/20 hover:bg-destructive/30 text-destructive transition-colors"
                        title="Удалить"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <AnimatePresence>
        {itemsArray.length > 0 && (
          <motion.div 
            className="glass rounded-xl p-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Выбрано компонентов: {itemsArray.length} из {categoryOrder.length}
                </p>
                <motion.p 
                  className="text-2xl md:text-3xl font-bold"
                  key={totalPrice}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                >
                  Итого: <span className="gradient-text">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </motion.p>
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  onClick={clearAll}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 size={18} />
                  <span>Очистить</span>
                </motion.button>
                <motion.button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground 
                             font-medium btn-glow hover:bg-primary/90 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={18} />
                  <span>Оформить</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      <AnimatePresence>
        {itemsArray.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-16 h-16 mx-auto text-primary/50 mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Начните собирать свой ПК
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Выберите компоненты из категорий выше, чтобы создать идеальную конфигурацию
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const getCategoryIcon = (category: ProductCategory) => {
  const icons: Record<ProductCategory, React.ReactNode> = {
    cpu: <Cpu className="w-6 h-6 text-primary" />,
    motherboard: <CircuitBoard className="w-6 h-6 text-primary" />,
    ram: <MemoryStick className="w-6 h-6 text-primary" />,
    gpu: <Monitor className="w-6 h-6 text-primary" />,
    ssd: <HardDrive className="w-6 h-6 text-primary" />,
    psu: <Zap className="w-6 h-6 text-primary" />,
    cooling: <Wind className="w-6 h-6 text-primary" />,
    case: <Box className="w-6 h-6 text-primary" />,
  };
  return icons[category];
};
