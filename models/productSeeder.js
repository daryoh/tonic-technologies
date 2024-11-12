const {Product} = require('../models');

const productSeeds = [
  {
    name: "Gaming Laptop",
    description: "High-performance gaming laptop with RTX 3080",
    category: "Electronics",
    price: 1999.99,
    stockQuantity: 10
  },
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling Bluetooth headphones",
    category: "Audio",
    price: 299.99,
    stockQuantity: 25
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking smartwatch with heart rate monitor",
    category: "Wearables",
    price: 199.99,
    stockQuantity: 30
  },
  {
    name: "4K Monitor",
    description: "32-inch 4K Ultra HD Display",
    category: "Electronics",
    price: 499.99,
    stockQuantity: 15
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical gaming keyboard",
    category: "Peripherals",
    price: 149.99,
    stockQuantity: 20
  }
];

const seedProducts = async () => {
    try {
      await Product.insertMany(productSeeds);
      console.log('Products seeded successfully');
      process.exit();
    } catch (error) {
      console.error('Error seeding products:', error);
      process.exit(1);
    }
  };
  
  seedProducts();
