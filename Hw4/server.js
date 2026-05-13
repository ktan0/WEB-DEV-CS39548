import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import menuRoutes from './routes/menu.js';
import orderRoutes from './routes/orders.js';
import MenuItem from './models/MenuItem.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
await connectDB();

// Initialize sample data if collection is empty
const menuCount = await MenuItem.countDocuments();
if (menuCount === 0) {
  const sampleMenuItems = [
    { name: 'Garlic Bread', price: 5.99, category: 'appetizers', description: 'Crispy bread with garlic butter' },
    { name: 'Chicken Wings', price: 8.99, category: 'appetizers', description: 'Spicy chicken wings' },
    { name: 'Mozzarella Sticks', price: 6.99, category: 'appetizers', description: 'Fried mozzarella sticks' },
    { name: 'Grilled Salmon', price: 18.99, category: 'mainCourses', description: 'Fresh grilled salmon fillet' },
    { name: 'Steak Frites', price: 22.99, category: 'mainCourses', description: 'Prime steak with fries' },
    { name: 'Chicken Parmesan', price: 16.99, category: 'mainCourses', description: 'Crispy chicken with parmesan' },
    { name: 'Chocolate Cake', price: 6.99, category: 'desserts', description: 'Rich chocolate cake' },
    { name: 'Tiramisu', price: 7.99, category: 'desserts', description: 'Classic Italian tiramisu' },
    { name: 'Ice Cream', price: 4.99, category: 'desserts', description: 'Homemade ice cream' },
  ];

  try {
    await MenuItem.insertMany(sampleMenuItems);
    console.log('Sample menu items inserted into database');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Restaurant API Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
