import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a menu item name'],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative'],
  },
  category: {
    type: String,
    enum: ['appetizers', 'mainCourses', 'desserts'],
    required: [true, 'Please specify a category'],
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
