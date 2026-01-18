import { Product, Seller, ProductCategory, categoryNames } from '@/types/product';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { ExternalLink, Plus, Check, Cpu, CircuitBoard, MemoryStick, Monitor, HardDrive, Zap, Wind, Box } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  animationDelay?: number;
}

export const ProductCard = ({ product, animationDelay = 0 }: ProductCardProps) => {
  const { items, addItem } = useConfiguratorStore();
  const isSelected = items.has(product.category) && 
    items.get(product.category)?.product.id === product.id;

  const handleView = (url: string) => {
    window.open(url, '_blank');
  };

  const handleSelect = (seller: Seller) => {
    addItem(product.category, product, seller);
    toast.success(`${product.name} добавлен в конфигуратор`, {
      description: `Магазин: ${seller.name} • ${seller.price.toLocaleString('ru-RU')} ₽`,
    });
  };

  return (
    <motion.div 
      className={`glass rounded-xl overflow-hidden transition-all duration-300 group
                  hover:border-primary/30 hover:shadow-[0_0_30px_hsl(187_100%_50%/0.2)] ${
                    isSelected ? 'border-primary/50 shadow-[0_0_30px_hsl(187_100%_50%/0.3)]' : ''
                  }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay * 0.001, duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      {/* Main Product */}
      <div className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <motion.div 
            className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-secondary/50 flex items-center justify-center overflow-hidden flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              {getCategoryIcon(product.category)}
            </div>
          </motion.div>
          
          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground mb-2">
              {categoryNames[product.category]}
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-medium">
                {product.mainSeller.name}
              </span>
            </div>
            <p className="text-lg md:text-xl font-bold gradient-text">
              {product.mainSeller.price.toLocaleString('ru-RU')} ₽
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <motion.button
            onClick={() => handleView(product.mainSeller.url)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink size={16} />
            <span>Посмотреть</span>
          </motion.button>
          <motion.button
            onClick={() => handleSelect(product.mainSeller)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              isSelected 
                ? 'bg-primary/20 text-primary border border-primary' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90 btn-glow'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSelected ? <Check size={16} /> : <Plus size={16} />}
            <span>{isSelected ? 'Выбрано' : 'Выбрать'}</span>
          </motion.button>
        </div>
      </div>
      
      {/* Alternative Sellers */}
      {product.alternativeSellers.length > 0 && (
        <div className="border-t border-border/50 bg-card/30">
          <div className="p-3">
            <p className="text-xs text-muted-foreground mb-2 font-medium">Другие продавцы:</p>
            <div className="space-y-2">
              {product.alternativeSellers.map((seller) => (
                <motion.div 
                  key={seller.id}
                  className="flex items-center justify-between gap-2 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-medium text-muted-foreground">
                      {seller.name}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {seller.price.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleView(seller.url)}
                      className="p-1.5 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
                      title="Посмотреть"
                    >
                      <ExternalLink size={14} />
                    </button>
                    <button
                      onClick={() => handleSelect(seller)}
                      className="p-1.5 rounded-md bg-primary/80 hover:bg-primary text-primary-foreground transition-colors"
                      title="Выбрать"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const getCategoryIcon = (category: ProductCategory) => {
  const icons: Record<ProductCategory, React.ReactNode> = {
    cpu: <Cpu className="w-12 h-12 md:w-16 md:h-16 text-primary" />,
    motherboard: <CircuitBoard className="w-12 h-12 md:w-16 md:h-16 text-primary" />,
    ram: <MemoryStick className="w-12 h-12 md:w-16 md:h-16 text-primary" />,
    gpu: <Monitor className="w-12 h-12 md:w-16 md:h-16 text-primary" />,
    ssd: <HardDrive className="w-12 h-12 md:w-16 md:h-16 text-primary" />,
    psu: <Zap className="w-12 h-12 md:w-16 md:h-16 text-primary" />,
    cooling: <Wind className="w-12 h-12 md:w-16 md:h-16 text-primary" />,
    case: <Box className="w-12 h-12 md:w-16 md:h-16 text-primary" />,
  };
  return icons[category];
};
