# Restaurant Web Application - Frontend (Hw3)

This is the React frontend for the restaurant web application, built with Vite and Bootstrap.

## Features

- **Menu Display**: Fetches and displays menu items from the backend API
- **Shopping Cart**: Add/remove items with real-time total calculation
- **Order Checkout**: Submit orders with customer information
- **Responsive Design**: Mobile-friendly interface using Bootstrap

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure API URL:
   - For development: `VITE_API_URL=http://localhost:5000`
   - For production: Update `.env` with your deployed backend URL

3. Start development server:
```bash
npm run dev
```

## Deployment

### Vercel Deployment

1. Push this code to GitHub
2. Connect your GitHub repo to Vercel
3. Set environment variable: `VITE_API_URL=https://your-backend-url.vercel.app`
4. Deploy

### Manual Build

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.