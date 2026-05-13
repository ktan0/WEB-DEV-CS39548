import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ category: 1, name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get menu items by category
router.get('/category/:category', async (req, res) => {
  try {
    const items = await MenuItem.find({ category: req.params.category }).sort({ name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new menu item (admin)
router.post('/', async (req, res) => {
  const menuItem = new MenuItem({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
  });

  try {
    const newItem = await menuItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a menu item (admin)
router.patch('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    if (req.body.name) item.name = req.body.name;
    if (req.body.price) item.price = req.body.price;
    if (req.body.category) item.category = req.body.category;
    if (req.body.description) item.description = req.body.description;
    item.updatedAt = Date.now();

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a menu item (admin)
router.delete('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
