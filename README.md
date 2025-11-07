# Trading Journal App

A full-stack trading journal application to track, analyze, and improve your trading performance.

## Features

- **User Authentication**: Secure JWT-based authentication
- **Trade Management**: Add, edit, delete, and view all your trades
- **Comprehensive Trade Data**: Track ticker, entry/exit prices, quantity, P&L, fees, and detailed notes
- **Dashboard**: Visual overview of your trading performance
- **Analytics**: Charts and statistics to analyze your trading patterns
- **Trade Journal**: Detailed notes and reflections for each trade
- **Tags & Strategies**: Categorize trades by strategy or setup type

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Recharts for data visualization
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing

## Project Structure

```
trading-journal/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── utils/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd trading-journal
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Create .env file in backend directory
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trading-journal
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

5. Start the backend server
```bash
cd backend
npm run dev
```

6. Start the frontend development server
```bash
cd frontend
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Trades
- `GET /api/trades` - Get all trades for authenticated user
- `GET /api/trades/:id` - Get single trade
- `POST /api/trades` - Create new trade
- `PUT /api/trades/:id` - Update trade
- `DELETE /api/trades/:id` - Delete trade

### Analytics
- `GET /api/analytics/summary` - Get trading summary statistics
- `GET /api/analytics/performance` - Get performance over time

## License

MIT
