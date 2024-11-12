const Product = require("../models/Product");

const seedProducts = [
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

const seedDatabase = async () => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      await Product.insertMany(seedProducts);
      console.log("Database seeded successfully");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = { seedDatabase };
