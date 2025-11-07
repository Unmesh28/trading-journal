# Trading Journal App - Setup Guide

## Overview

This is a full-stack trading journal application built with React.js (frontend) and Node.js/Express (backend). The app helps traders track, analyze, and improve their trading performance.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- MongoDB (v4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- Git (optional, for version control)

## Installation Steps

### 1. Install MongoDB

**Option A: Local Installation**
- Download and install MongoDB from the official website
- Start MongoDB service:
  ```bash
  # On macOS (with Homebrew)
  brew services start mongodb-community

  # On Linux
  sudo systemctl start mongod

  # On Windows
  # MongoDB should start automatically after installation
  ```

**Option B: MongoDB Atlas (Cloud)**
- Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Get your connection string

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
# Required variables:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/trading-journal  (or your Atlas connection string)
# JWT_SECRET=your_secret_key_here
# NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (open a new terminal)
cd frontend

# Install dependencies
npm install
```

## Running the Application

### Start Backend Server

```bash
# From the backend directory
cd backend
npm run dev
```

The backend server will start on http://localhost:5000

### Start Frontend Development Server

```bash
# From the frontend directory (in a separate terminal)
cd frontend
npm start
```

The frontend will start on http://localhost:3000 and automatically open in your browser.

## Creating Your First User

1. Open http://localhost:3000 in your browser
2. Click "Register" to create a new account
3. Fill in the registration form:
   - Username (minimum 3 characters)
   - Email
   - Password (minimum 6 characters)
4. Click "Register" to create your account
5. You'll be automatically logged in and redirected to the dashboard

## Using the Application

### Dashboard
- View summary statistics of your trading performance
- See your recent trades
- Quick access to add new trades

### Adding a Trade

1. Click "Add Trade" button
2. Fill in the required fields:
   - **Ticker Symbol**: Stock/crypto symbol (e.g., AAPL, BTC)
   - **Trade Type**: LONG or SHORT
   - **Entry Date**: When you entered the trade
   - **Entry Price**: Price at which you entered
   - **Quantity**: Number of shares/units
   - **Status**: OPEN or CLOSED

3. Optional fields:
   - Exit Date and Price (if trade is closed)
   - Fees
   - Strategy
   - Tags
   - Emotional State
   - Notes, Mistakes, Lessons Learned

4. Click "Create Trade"

### Viewing Trades

- Navigate to "Trades" in the navbar
- Filter trades by status (All, Open, Closed)
- Click on any trade to view full details
- Edit or delete trades from the detail page

### Analytics

- Navigate to "Analytics" in the navbar
- View comprehensive statistics:
  - Win rate
  - Total P&L
  - Average win/loss
  - Profit factor
  - And more...
- View performance charts over time
- Toggle between daily, weekly, monthly, and yearly views

## Project Structure

```
trading-journal/
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # MongoDB models (User, Trade)
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth middleware
│   │   └── utils/          # Helper functions
│   ├── server.js           # Express server entry point
│   ├── package.json
│   └── .env               # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── context/        # React context (Auth)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Trades
- `GET /api/trades` - Get all trades (protected)
- `GET /api/trades/:id` - Get single trade (protected)
- `POST /api/trades` - Create new trade (protected)
- `PUT /api/trades/:id` - Update trade (protected)
- `DELETE /api/trades/:id` - Delete trade (protected)

### Analytics
- `GET /api/analytics/summary` - Get summary statistics (protected)
- `GET /api/analytics/performance` - Get performance data (protected)

## Troubleshooting

### MongoDB Connection Issues

**Error: "MongoServerError: Authentication failed"**
- Check your MongoDB credentials in .env file
- Ensure MongoDB is running

**Error: "connect ECONNREFUSED"**
- Ensure MongoDB is running
- Check that the connection string is correct

### Port Already in Use

If port 5000 or 3000 is already in use:

**For Backend:**
- Change the PORT in backend/.env file
- Update the proxy in frontend/package.json

**For Frontend:**
- Create a .env file in frontend directory
- Add: `PORT=3001` (or any available port)

### CORS Issues

If you encounter CORS errors:
- Ensure the backend is running on port 5000
- Check that the proxy is correctly set in frontend/package.json

## Building for Production

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build/` directory.

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trading-journal
JWT_SECRET=your_very_secure_secret_key_here
NODE_ENV=development
```

**Important:** Never commit your .env file to version control!

## Tips for Best Results

1. **Regular Updates**: Update your trades regularly for accurate analytics
2. **Detailed Notes**: Take detailed notes on each trade for better insights
3. **Tag Consistency**: Use consistent tags for better categorization
4. **Emotional Tracking**: Track your emotional state to identify patterns
5. **Review Analytics**: Regularly review your analytics to identify areas for improvement

## Support

For issues or questions:
1. Check this guide first
2. Review the README.md file
3. Check the MongoDB and Node.js documentation

## Next Steps

Now that your app is set up:
1. Create your user account
2. Add your first trade
3. Explore the analytics features
4. Start tracking your trading journey!

Happy Trading!
