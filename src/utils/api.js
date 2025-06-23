// Mock API for products with real working images
const generateProducts = () => {
  const categories = ['Electronics', 'Men\'s Clothing', 'Women\'s Clothing', 'Home & Kitchen', 'Sports & Outdoors'];
  
  const productData = [
    // Electronics (10 products)
    { name: 'Wireless Bluetooth Headphones', category: 'Electronics', price: 89, image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Smart Watch Series 7', category: 'Electronics', price: 299, image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Laptop Gaming Pro', category: 'Electronics', price: 1299, image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Smartphone 128GB', category: 'Electronics', price: 699, image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Wireless Speaker', category: 'Electronics', price: 149, image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Digital Camera 4K', category: 'Electronics', price: 899, image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Gaming Console', category: 'Electronics', price: 499, image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Tablet 10 Inch', category: 'Electronics', price: 329, image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Wireless Earbuds', category: 'Electronics', price: 179, image: 'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Smart TV 55 Inch', category: 'Electronics', price: 799, image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    
    // Men's Clothing (10 products)
    { name: 'Men\'s Cotton T-Shirt', category: 'Men\'s Clothing', price: 29, image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Men\'s Denim Jeans', category: 'Men\'s Clothing', price: 79, image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Men\'s Formal Shirt', category: 'Men\'s Clothing', price: 59, image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Men\'s Leather Jacket', category: 'Men\'s Clothing', price: 199, image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Men\'s Casual Hoodie', category: 'Men\'s Clothing', price: 69, image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Men\'s Sports Shorts', category: 'Men\'s Clothing', price: 39, image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Men\'s Polo Shirt', category: 'Men\'s Clothing', price: 49, image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Men\'s Chino Pants', category: 'Men\'s Clothing', price: 89, image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Men\'s Winter Coat', category: 'Men\'s Clothing', price: 159, image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Men\'s Sneakers', category: 'Men\'s Clothing', price: 119, image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    
    // Women's Clothing (10 products)
    { name: 'Women\'s Summer Dress', category: 'Women\'s Clothing', price: 89, image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Women\'s Blouse', category: 'Women\'s Clothing', price: 59, image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Women\'s Skinny Jeans', category: 'Women\'s Clothing', price: 79, image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Women\'s Cardigan', category: 'Women\'s Clothing', price: 69, image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Women\'s Maxi Dress', category: 'Women\'s Clothing', price: 99, image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Women\'s Blazer', category: 'Women\'s Clothing', price: 129, image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Women\'s Yoga Pants', category: 'Women\'s Clothing', price: 49, image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Women\'s Evening Gown', category: 'Women\'s Clothing', price: 199, image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Women\'s Casual Top', category: 'Women\'s Clothing', price: 39, image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Women\'s High Heels', category: 'Women\'s Clothing', price: 89, image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    
    // Home & Kitchen (10 products)
    { name: 'Coffee Maker Deluxe', category: 'Home & Kitchen', price: 149, image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Non-Stick Cookware Set', category: 'Home & Kitchen', price: 199, image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Blender Pro 1000W', category: 'Home & Kitchen', price: 89, image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Dining Table Set', category: 'Home & Kitchen', price: 599, image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Kitchen Knife Set', category: 'Home & Kitchen', price: 79, image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Microwave Oven', category: 'Home & Kitchen', price: 299, image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Vacuum Cleaner', category: 'Home & Kitchen', price: 179, image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Air Fryer Digital', category: 'Home & Kitchen', price: 129, image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Bed Sheet Set', category: 'Home & Kitchen', price: 59, image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Storage Organizer', category: 'Home & Kitchen', price: 39, image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    
    // Sports & Outdoors (10 products)
    { name: 'Yoga Mat Premium', category: 'Sports & Outdoors', price: 49, image: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Dumbbell Set 20kg', category: 'Sports & Outdoors', price: 89, image: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Running Shoes Pro', category: 'Sports & Outdoors', price: 129, image: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Basketball Official', category: 'Sports & Outdoors', price: 39, image: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Camping Tent 4-Person', category: 'Sports & Outdoors', price: 199, image: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Fitness Tracker', category: 'Sports & Outdoors', price: 79, image: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Bicycle Mountain', category: 'Sports & Outdoors', price: 599, image: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Swimming Goggles', category: 'Sports & Outdoors', price: 29, image: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Golf Club Set', category: 'Sports & Outdoors', price: 399, image: 'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' },
    { name: 'Hiking Backpack', category: 'Sports & Outdoors', price: 89, image: 'https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' }
  ];
  
  return productData.map((product, index) => ({
    id: index + 1,
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category,
    brand: 'EliteCart',
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 1000) + 10,
    description: `Experience premium quality with our ${product.name.toLowerCase()}. Crafted with attention to detail and built to last.`,
    inStock: Math.random() > 0.1,
    discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 5 : 0
  }));
};

export const mockProducts = generateProducts();

export const fetchProducts = async (page = 1, limit = 10, search = '', category = '') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredProducts = mockProducts;
  
  // Search filter - exact match with minimum 3 characters
  if (search && search.length >= 3) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower)
    );
  }
  
  // Category filter
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === category
    );
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    totalPages: Math.ceil(filteredProducts.length / limit),
    hasMore: endIndex < filteredProducts.length
  };
};

export const getCategories = () => {
  return [...new Set(mockProducts.map(product => product.category))];
};