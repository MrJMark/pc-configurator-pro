export interface Seller {
  id: string;
  name: string;
  price: number;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  category: ProductCategory;
  mainSeller: Seller;
  alternativeSellers: Seller[];
  specs?: Record<string, string>;
}

export type ProductCategory = 
  | 'cpu'
  | 'motherboard'
  | 'ram'
  | 'gpu'
  | 'ssd'
  | 'psu'
  | 'cooling'
  | 'case';

export interface ConfiguratorItem {
  category: ProductCategory;
  product: Product;
  seller: Seller;
}

export interface PCConfiguration {
  items: ConfiguratorItem[];
  totalPrice: number;
}

export const categoryNames: Record<ProductCategory, string> = {
  cpu: 'Процессор',
  motherboard: 'Материнская плата',
  ram: 'Оперативная память',
  gpu: 'Видеокарта',
  ssd: 'SSD',
  psu: 'Блок питания',
  cooling: 'Кулер/СЖО',
  case: 'Корпус',
};

export const categoryIcons: Record<ProductCategory, string> = {
  cpu: '🔲',
  motherboard: '🔌',
  ram: '📊',
  gpu: '🎮',
  ssd: '💾',
  psu: '⚡',
  cooling: '❄️',
  case: '🖥️',
};
