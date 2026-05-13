# Restaurant Web Application - Homework 4 (Backend)

## Overview
This project extends the Homework 3 React restaurant application by adding a complete Node.js/Express/MongoDB backend. The backend provides REST API endpoints for menu management, order processing, and data persistence.

## Features

### Backend API
- **Menu Management**: Fetch menu items from MongoDB with category organization
- **Order Processing**: Create, retrieve, update, and delete orders
- **Real-time Database Updates**: All changes persist to MongoDB
- **CRUD Operations**: Full CRUD support for menu items and orders
- **Error Handling**: Comprehensive error handling and validation
- **CORS Support**: Configured to work with React frontend on different ports

### Frontend Integration (Updated Hw3)
- Menu items fetched dynamically from backend API
- Shopping cart functionality with persistent backend
- Order checkout with customer information
- Real-time order submission to database

## Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (local or cloud instance)
   - Local: MongoDB should be running on `mongodb://localhost:27017`
   - Cloud: Update MONGODB_URI in `.env` with your MongoDB Atlas connection string
3. **npm** (comes with Node.js)

## Installation

### Backend Setup

1. Navigate to the Hw4 directory:
```bash
cd Hw4
```

2. Install dependencies:
```bash
npm install
```

3. Ensure MongoDB is running:
   - **Local MongoDB**: Start MongoDB service
   - **MongoDB Atlas**: Ensure your connection string is in `.env`

4. Update `.env` file if needed:
```
MONGODB_URI=mongodb://localhost:27017/restaurant
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

5. Start the backend server:
```bash
npm run dev
```

The backend will start on `http://localhost:5000` and automatically populate sample menu items on first run.

### Frontend Setup (Hw3)

1. Navigate to the Hw3 directory:
```bash
cd ../Hw3
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173` and connect to the backend at `http://localhost:5000`.

## API Endpoints

### Menu Endpoints

#### Get All Menu Items
```
GET /api/menu
Response: Array of all menu items organized by category
```

#### Get Menu Items by Category
```
GET /api/menu/category/:category
Parameters: appetizers, mainCourses, or desserts
```

#### Get Single Menu Item
```
GET /api/menu/:id
```

#### Create Menu Item (Admin)
```
POST /api/menu
Body: {
  name: string,
  price: number,
  category: string,
  description: string
}
```

#### Update Menu Item (Admin)
```
PATCH /api/menu/:id
Body: {
  name?: string,
  price?: number,
  category?: string,
  description?: string
}
```

#### Delete Menu Item (Admin)
```
DELETE /api/menu/:id
```

### Order Endpoints

#### Get All Orders
```
GET /api/orders
Response: Array of all orders sorted by newest first
```

#### Get Single Order
```
GET /api/orders/:id
```

#### Create Order
```
POST /api/orders
Body: {
  items: [
    {
      name: string,
      quantity: number,
      price: number
    }
  ],
  total: number,
  customerName: string,
  customerEmail?: string,
  customerPhone?: string,
  notes?: string
}
```

#### Update Order Status
```
PATCH /api/orders/:id
Body: {
  status?: string (pending, confirmed, preparing, ready, completed, cancelled),
  notes?: string
}
```

#### Delete Order
```
DELETE /api/orders/:id
```

#### Get Orders by Status
```
GET /api/orders/status/:status
```

## Database Schema

### MenuItem Collection
```javascript
{
  name: String (unique, required),
  price: Number (required, min: 0),
  category: String (enum: ['appetizers', 'mainCourses', 'desserts']),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Collection
```javascript
{
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  status: String (default: 'pending'),
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Testing the Application

1. **Start Backend**: `npm run dev` in Hw4 folder
2. **Start Frontend**: `npm run dev` in Hw3 folder
3. **Open Browser**: Navigate to `http://localhost:5173`
4. **Test Workflow**:
   - View menu items (fetched from backend)
   - Add items to cart
   - Fill in customer information
   - Click "Place Order"
   - Check MongoDB to see the order saved

## Video Recording Tips

To record a video showing real-time database updates:

1. **Setup**: 
   - Open MongoDB Compass or CLI on one side
   - Open browser with React app on the other
   - Have backend running in terminal

2. **Recording**:
   - Record the desktop showing all windows
   - Add items to cart on the website
   - Submit an order
   - Show the MongoDB collection updating in real-time
   - Demonstrate updating order status via API calls

3. **Optional MongoDB Queries**:
   - View menu items: `db.menuitems.find()`
   - View all orders: `db.orders.find().sort({createdAt: -1})`
   - View specific order: `db.orders.findOne({_id: ObjectId("...")})`

## Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check `.env` file MONGODB_URI is correct
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Menu items not loading in frontend
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Ensure CORS_ORIGIN in `.env` matches frontend URL

### Orders not saving to database
- Check MongoDB connection in backend console
- Verify order data format matches schema
- Check backend console for error messages

### CORS Errors
- Update CORS_ORIGIN in `.env` to match your frontend URL
- Restart backend server after changing `.env`

## Project Structure

```
Hw4/
├── config/
│   └── db.js              # MongoDB connection configuration
├── models/
│   ├── MenuItem.js        # Menu item schema
│   └── Order.js           # Order schema
├── routes/
│   ├── menu.js            # Menu API routes
│   └── orders.js          # Order API routes
├── server.js              # Express server setup
├── package.json           # Dependencies
├── .env                   # Environment variables
└── .gitignore             # Git ignore file

Hw3/
└── Updated to fetch from backend API
```

## Technologies Used

- **Backend**: Node.js, Express.js, Mongoose, MongoDB
- **Frontend**: React, Vite, Bootstrap
- **Database**: MongoDB
- **API**: REST with JSON

## Next Steps (Optional Enhancements)

1. Add user authentication (JWT)
2. Add payment processing (Stripe)
3. Add email notifications
4. Add admin panel for order management
5. Add real-time updates (WebSockets)
6. Add menu item images
7. Add user accounts and order history
8. Deploy to cloud (Heroku, Vercel, etc.)

## Notes

- Sample menu items are automatically created on first backend startup
- Orders are stored with timestamps for tracking
- The application demonstrates full CRUD operations
- All data persists in MongoDB
