import { Product, ProductCategory } from '@/types/product';

const generateProducts = (category: ProductCategory, products: Partial<Product>[]): Product[] => {
  return products.map((p, index) => ({
    id: `${category}-${index + 1}`,
    name: p.name || '',
    image: p.image || '/placeholder.svg',
    category,
    mainSeller: p.mainSeller || {
      id: `seller-dns-${index}`,
      name: 'DNS',
      price: 15000 + Math.floor(Math.random() * 50000),
      url: 'https://dns-shop.ru',
    },
    alternativeSellers: p.alternativeSellers || [
      {
        id: `seller-citilink-${index}`,
        name: 'Citilink',
        price: 14500 + Math.floor(Math.random() * 50000),
        url: 'https://citilink.ru',
      },
      {
        id: `seller-mvideo-${index}`,
        name: 'М.Видео',
        price: 16000 + Math.floor(Math.random() * 50000),
        url: 'https://mvideo.ru',
      },
    ],
    specs: p.specs,
  }));
};

export const mockProducts: Product[] = [
  // CPUs
  ...generateProducts('cpu', [
    { name: 'AMD Ryzen 9 7950X', mainSeller: { id: 's1', name: 'DNS', price: 52990, url: 'https://dns-shop.ru' } },
    { name: 'AMD Ryzen 7 7800X3D', mainSeller: { id: 's2', name: 'DNS', price: 42990, url: 'https://dns-shop.ru' } },
    { name: 'Intel Core i9-14900K', mainSeller: { id: 's3', name: 'Citilink', price: 58990, url: 'https://citilink.ru' } },
    { name: 'Intel Core i7-14700K', mainSeller: { id: 's4', name: 'DNS', price: 45990, url: 'https://dns-shop.ru' } },
    { name: 'AMD Ryzen 5 7600X', mainSeller: { id: 's5', name: 'М.Видео', price: 22990, url: 'https://mvideo.ru' } },
    { name: 'Intel Core i5-14600K', mainSeller: { id: 's6', name: 'DNS', price: 32990, url: 'https://dns-shop.ru' } },
  ]),
  
  // Motherboards
  ...generateProducts('motherboard', [
    { name: 'ASUS ROG Strix X670E-E Gaming', mainSeller: { id: 's7', name: 'DNS', price: 45990, url: 'https://dns-shop.ru' } },
    { name: 'MSI MEG Z790 ACE', mainSeller: { id: 's8', name: 'Citilink', price: 52990, url: 'https://citilink.ru' } },
    { name: 'Gigabyte B650 AORUS Elite AX', mainSeller: { id: 's9', name: 'DNS', price: 24990, url: 'https://dns-shop.ru' } },
    { name: 'ASRock B760M Pro RS', mainSeller: { id: 's10', name: 'М.Видео', price: 12990, url: 'https://mvideo.ru' } },
  ]),
  
  // RAM
  ...generateProducts('ram', [
    { name: 'G.Skill Trident Z5 RGB 32GB DDR5-6000', mainSeller: { id: 's11', name: 'DNS', price: 18990, url: 'https://dns-shop.ru' } },
    { name: 'Kingston Fury Beast 32GB DDR5-5200', mainSeller: { id: 's12', name: 'Citilink', price: 12990, url: 'https://citilink.ru' } },
    { name: 'Corsair Vengeance 64GB DDR5-5600', mainSeller: { id: 's13', name: 'DNS', price: 28990, url: 'https://dns-shop.ru' } },
    { name: 'TeamGroup T-Force Delta RGB 16GB DDR4-3200', mainSeller: { id: 's14', name: 'М.Видео', price: 5990, url: 'https://mvideo.ru' } },
  ]),
  
  // GPUs
  ...generateProducts('gpu', [
    { name: 'NVIDIA GeForce RTX 4090 Founders Edition', mainSeller: { id: 's15', name: 'DNS', price: 189990, url: 'https://dns-shop.ru' } },
    { name: 'NVIDIA GeForce RTX 4080 SUPER', mainSeller: { id: 's16', name: 'Citilink', price: 119990, url: 'https://citilink.ru' } },
    { name: 'AMD Radeon RX 7900 XTX', mainSeller: { id: 's17', name: 'DNS', price: 99990, url: 'https://dns-shop.ru' } },
    { name: 'NVIDIA GeForce RTX 4070 Ti SUPER', mainSeller: { id: 's18', name: 'М.Видео', price: 89990, url: 'https://mvideo.ru' } },
    { name: 'AMD Radeon RX 7800 XT', mainSeller: { id: 's19', name: 'DNS', price: 54990, url: 'https://dns-shop.ru' } },
    { name: 'NVIDIA GeForce RTX 4060 Ti', mainSeller: { id: 's20', name: 'Citilink', price: 44990, url: 'https://citilink.ru' } },
  ]),
  
  // SSDs
  ...generateProducts('ssd', [
    { name: 'Samsung 990 Pro 2TB NVMe', mainSeller: { id: 's21', name: 'DNS', price: 18990, url: 'https://dns-shop.ru' } },
    { name: 'WD Black SN850X 1TB', mainSeller: { id: 's22', name: 'Citilink', price: 12990, url: 'https://citilink.ru' } },
    { name: 'Kingston KC3000 2TB', mainSeller: { id: 's23', name: 'DNS', price: 16990, url: 'https://dns-shop.ru' } },
    { name: 'Crucial T700 1TB Gen5', mainSeller: { id: 's24', name: 'М.Видео', price: 21990, url: 'https://mvideo.ru' } },
  ]),
  
  // PSUs
  ...generateProducts('psu', [
    { name: 'Corsair RM1000x 1000W 80+ Gold', mainSeller: { id: 's25', name: 'DNS', price: 18990, url: 'https://dns-shop.ru' } },
    { name: 'be quiet! Dark Power Pro 12 1200W', mainSeller: { id: 's26', name: 'Citilink', price: 32990, url: 'https://citilink.ru' } },
    { name: 'Seasonic Prime TX-850 850W 80+ Titanium', mainSeller: { id: 's27', name: 'DNS', price: 24990, url: 'https://dns-shop.ru' } },
    { name: 'EVGA SuperNOVA 750 G7 750W', mainSeller: { id: 's28', name: 'М.Видео', price: 12990, url: 'https://mvideo.ru' } },
  ]),
  
  // Cooling
  ...generateProducts('cooling', [
    { name: 'NZXT Kraken Z73 RGB 360mm', mainSeller: { id: 's29', name: 'DNS', price: 28990, url: 'https://dns-shop.ru' } },
    { name: 'Corsair iCUE H150i Elite LCD 360mm', mainSeller: { id: 's30', name: 'Citilink', price: 32990, url: 'https://citilink.ru' } },
    { name: 'Noctua NH-D15 chromax.black', mainSeller: { id: 's31', name: 'DNS', price: 12990, url: 'https://dns-shop.ru' } },
    { name: 'be quiet! Dark Rock Pro 4', mainSeller: { id: 's32', name: 'М.Видео', price: 8990, url: 'https://mvideo.ru' } },
    { name: 'Arctic Liquid Freezer II 280', mainSeller: { id: 's33', name: 'DNS', price: 9990, url: 'https://dns-shop.ru' } },
  ]),
  
  // Cases
  ...generateProducts('case', [
    { name: 'Lian Li O11 Dynamic EVO', mainSeller: { id: 's34', name: 'DNS', price: 18990, url: 'https://dns-shop.ru' } },
    { name: 'NZXT H9 Flow', mainSeller: { id: 's35', name: 'Citilink', price: 21990, url: 'https://citilink.ru' } },
    { name: 'Fractal Design Torrent', mainSeller: { id: 's36', name: 'DNS', price: 24990, url: 'https://dns-shop.ru' } },
    { name: 'Corsair 5000D Airflow', mainSeller: { id: 's37', name: 'М.Видео', price: 16990, url: 'https://mvideo.ru' } },
    { name: 'be quiet! Pure Base 500DX', mainSeller: { id: 's38', name: 'DNS', price: 11990, url: 'https://dns-shop.ru' } },
  ]),
];

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return mockProducts.filter(p => p.category === category);
};

export const searchProducts = (query: string, category?: ProductCategory): Product[] => {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(lowerQuery);
    const matchesCategory = category ? p.category === category : true;
    return matchesQuery && matchesCategory;
  });
};
