# Trading Journal App

A full-stack trading journal application to track, analyze, and improve your trading performance.

## Features

- **User Authentication**: Secure JWT-based authentication with email and password
- **Trading Rules Management**: Create, manage, and track your trading rules
  - Categorize rules (Entry, Exit, Risk Management, Position Sizing, Psychology)
  - Set priority levels and active/inactive status
  - Visual organization with color-coded categories
- **Comprehensive Trade Management**: Track all aspects of your trades
  - Multi-market support (Forex, Crypto, US Stocks, Indian Stocks)
  - Entry/Exit prices, Stop Loss, Targets, Leverage
  - Amount invested and account tracking
  - Auto-calculated P&L and results
- **Psychology Tracking**: Monitor emotions before and after trades
- **Rule Compliance**: Track if you followed your trading rules
- **Dashboard**: Visual overview of your trading performance
- **Analytics**: Charts and statistics to analyze your trading patterns
- **Trade Journal**: Detailed notes, mistakes, and lessons learned
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
- MongoDB (or Docker)

### Quick Start with Docker (Recommended)

The easiest way to get started is using Docker for MongoDB:

```bash
# Start MongoDB with Docker
docker-compose -f docker-compose.mongo.yml up -d

# MongoDB will be available at mongodb://localhost:27017
# Mongo Express UI at http://localhost:8081 (admin/admin123)
```

Then continue with steps 2-6 below. See [DOCKER_SETUP.md](DOCKER_SETUP.md) for detailed Docker instructions.

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
```bash
cd backend
cp .env.example .env
```

Edit .env with your settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trading-journal
# Or with Docker: mongodb://admin:admin123@localhost:27017/trading-journal?authSource=admin
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

Access the app at http://localhost:3000

For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Trades
- `GET /api/trades` - Get all trades for authenticated user
- `GET /api/trades/:id` - Get single trade
- `POST /api/trades` - Create new trade
- `PUT /api/trades/:id` - Update trade
- `DELETE /api/trades/:id` - Delete trade

### Trading Rules
- `GET /api/trading-rules` - Get all trading rules
- `GET /api/trading-rules/:id` - Get single rule
- `POST /api/trading-rules` - Create new rule
- `PUT /api/trading-rules/:id` - Update rule
- `DELETE /api/trading-rules/:id` - Delete rule

### Analytics
- `GET /api/analytics/summary` - Get trading summary statistics
- `GET /api/analytics/performance` - Get performance over time

## Trade Fields

Each trade includes:
- Market type (Forex, Crypto, US, Indian)
- Pair/Ticker symbol
- Date and trade type (Long/Short)
- Entry, Exit, Stop Loss, Target prices
- Quantity and Leverage
- Amount Invested and Account name
- Strategy and reason for trade
- Emotions before and after trade
- Rule compliance tracking
- Notes, mistakes, and lessons learned
- Auto-calculated P&L and result (Win/Loss/Breakeven)

## Trading Rules

Create and manage your trading rules:
- Categorize by type (Entry, Exit, Risk Management, etc.)
- Set priority levels (1-5)
- Mark as active/inactive
- Visual organization with color-coded badges

## Documentation

- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup instructions
- [DOCKER_SETUP.md](DOCKER_SETUP.md) - Docker and MongoDB setup

## Docker Support

Run with Docker:
```bash
# MongoDB only (recommended for development)
docker-compose -f docker-compose.mongo.yml up -d

# Full stack (MongoDB + Backend + Frontend)
docker-compose up -d
```

See [DOCKER_SETUP.md](DOCKER_SETUP.md) for details.

## License

MIT
