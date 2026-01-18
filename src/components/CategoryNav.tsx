import { ProductCategory, categoryNames } from '@/types/product';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { 
  Cpu, 
  CircuitBoard, 
  MemoryStick, 
  Monitor, 
  HardDrive, 
  Zap, 
  Wind, 
  Box,
  Settings2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryNavProps {
  activeCategory: ProductCategory | 'configurator';
  onCategoryChange: (category: ProductCategory | 'configurator') => void;
}

const categoryIcons: Record<ProductCategory | 'configurator', React.ReactNode> = {
  cpu: <Cpu size={18} />,
  motherboard: <CircuitBoard size={18} />,
  ram: <MemoryStick size={18} />,
  gpu: <Monitor size={18} />,
  ssd: <HardDrive size={18} />,
  psu: <Zap size={18} />,
  cooling: <Wind size={18} />,
  case: <Box size={18} />,
  configurator: <Settings2 size={18} />,
};

const allCategories: (ProductCategory | 'configurator')[] = [
  'configurator',
  'cpu',
  'motherboard',
  'ram',
  'gpu',
  'ssd',
  'psu',
  'cooling',
  'case',
];

export const CategoryNav = ({ activeCategory, onCategoryChange }: CategoryNavProps) => {
  const { items } = useConfiguratorStore();
  const itemCount = items.size;

  return (
    <motion.nav 
      className="glass rounded-2xl p-2 mb-6 overflow-x-auto"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      id="components"
    >
      <div className="flex items-center gap-1 min-w-max">
        {allCategories.map((category, index) => {
          const isActive = activeCategory === category;
          const isConfigurator = category === 'configurator';
          
          return (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`relative flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap
                         transition-all duration-300 ${
                isActive
                  ? isConfigurator
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground'
                  : 'hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {categoryIcons[category]}
              <span className="hidden md:inline">
                {isConfigurator ? 'Конфигуратор ПК' : categoryNames[category as ProductCategory]}
              </span>
              <span className="md:hidden">
                {isConfigurator ? 'ПК' : categoryNames[category as ProductCategory].split(' ')[0]}
              </span>
              
              {/* Badge for configurator */}
              {isConfigurator && itemCount > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center 
                             px-1.5 text-xs font-bold rounded-full bg-primary text-primary-foreground"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {itemCount}
                </motion.span>
              )}
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-primary/10"
                  layoutId="activeCategory"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};
