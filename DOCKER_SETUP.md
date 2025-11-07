# Docker Setup Guide

This guide explains how to run the Trading Journal app using Docker and Docker Compose.

## Prerequisites

- Docker (v20.10 or higher) - [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose (v2.0 or higher) - Usually included with Docker Desktop

## Quick Start with Docker

### Option 1: MongoDB Only (Recommended for Development)

If you want to run only MongoDB in Docker and run backend/frontend locally:

```bash
# Start MongoDB and Mongo Express
docker-compose -f docker-compose.mongo.yml up -d

# MongoDB will be available at: mongodb://localhost:27017
# Mongo Express UI at: http://localhost:8081
# Login: admin / admin123
```

Then run backend and frontend locally as normal:
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm start
```

### Option 2: Full Stack with Docker

Run everything (MongoDB, Backend, Frontend) in Docker:

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d --build
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017
- **Mongo Express**: http://localhost:8081

## Docker Commands

### Starting Services

```bash
# Start all services
docker-compose up

# Start in background (detached mode)
docker-compose up -d

# Start only specific services
docker-compose up mongodb mongo-express
```

### Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes all data)
docker-compose down -v
```

### Viewing Logs

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f mongodb
```

### Rebuilding Services

```bash
# Rebuild all services
docker-compose build

# Rebuild specific service
docker-compose build backend

# Rebuild and restart
docker-compose up --build
```

## Configuration

### MongoDB Configuration

Default credentials (change in production):
- **Username**: admin
- **Password**: admin123
- **Database**: trading-journal
- **Port**: 27017

To change credentials, edit `docker-compose.yml`:
```yaml
environment:
  MONGO_INITDB_ROOT_USERNAME: your_username
  MONGO_INITDB_ROOT_PASSWORD: your_password
```

### Backend Configuration

Environment variables for backend are in `docker-compose.yml`:
```yaml
environment:
  PORT: 5000
  MONGODB_URI: mongodb://admin:admin123@mongodb:27017/trading-journal?authSource=admin
  JWT_SECRET: your_jwt_secret_key_change_this_in_production
  NODE_ENV: development
```

### Accessing MongoDB

#### Using MongoDB Compass

1. Open MongoDB Compass
2. Use connection string:
   ```
   mongodb://admin:admin123@localhost:27017
   ```

#### Using Mongo Express (Web UI)

1. Open browser: http://localhost:8081
2. Login with:
   - **Username**: admin
   - **Password**: admin123

#### Using MongoDB Shell

```bash
# Connect to MongoDB container
docker exec -it trading-journal-mongodb mongosh

# Or use mongosh with connection string
mongosh "mongodb://admin:admin123@localhost:27017"
```

## Data Persistence

MongoDB data is persisted in Docker volumes:
- `mongodb_data`: Database files
- `mongodb_config`: Configuration files

Data persists even when containers are stopped/restarted.

### Backup Data

```bash
# Backup database
docker exec trading-journal-mongodb mongodump --archive=/backup.archive --db=trading-journal

# Copy backup to host
docker cp trading-journal-mongodb:/backup.archive ./backup.archive
```

### Restore Data

```bash
# Copy backup to container
docker cp ./backup.archive trading-journal-mongodb:/backup.archive

# Restore database
docker exec trading-journal-mongodb mongorestore --archive=/backup.archive
```

## Troubleshooting

### Port Already in Use

If you get "port already in use" errors:

```bash
# Check what's using the port
lsof -i :27017  # MongoDB
lsof -i :5000   # Backend
lsof -i :3000   # Frontend
lsof -i :8081   # Mongo Express

# Stop the process or change ports in docker-compose.yml
```

### Connection Issues

If backend can't connect to MongoDB:

1. Check MongoDB is running:
   ```bash
   docker-compose ps
   ```

2. Check MongoDB logs:
   ```bash
   docker-compose logs mongodb
   ```

3. Verify connection string includes `authSource=admin`:
   ```
   mongodb://admin:admin123@mongodb:27017/trading-journal?authSource=admin
   ```

### Resetting Everything

To start fresh (WARNING: deletes all data):

```bash
# Stop and remove everything including volumes
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Start fresh
docker-compose up --build
```

## Production Deployment

For production, use a separate docker-compose file:

```bash
# Create docker-compose.prod.yml with production settings
docker-compose -f docker-compose.prod.yml up -d
```

**Important production changes:**
1. Use strong passwords
2. Change JWT_SECRET to a secure random string
3. Use environment variables file (.env)
4. Enable MongoDB authentication
5. Use nginx as reverse proxy
6. Set NODE_ENV=production
7. Build frontend for production
8. Use Docker secrets for sensitive data

## Development Workflow

### Hot Reloading

The docker-compose.yml is configured for development with hot reloading:
- Backend uses `nodemon` for auto-restart
- Frontend uses React's built-in hot reload
- Code changes are reflected immediately (no rebuild needed)

### Installing New Dependencies

```bash
# Backend
docker-compose exec backend npm install package-name

# Frontend
docker-compose exec frontend npm install package-name

# Or rebuild
docker-compose up --build
```

### Running Commands in Containers

```bash
# Backend
docker-compose exec backend npm run test

# Frontend
docker-compose exec frontend npm run build

# MongoDB
docker-compose exec mongodb mongosh
```

## Clean Up

### Remove Stopped Containers

```bash
docker container prune
```

### Remove Unused Images

```bash
docker image prune
```

### Remove Unused Volumes

```bash
docker volume prune
```

### Remove Everything (Nuclear Option)

```bash
docker system prune -a --volumes
```

## Support

For issues:
1. Check logs: `docker-compose logs -f`
2. Verify services: `docker-compose ps`
3. Check Docker version: `docker --version`
4. Check Docker Compose version: `docker-compose --version`

## Next Steps

1. Start with MongoDB only: `docker-compose -f docker-compose.mongo.yml up -d`
2. Update backend/.env with MongoDB connection string
3. Run backend and frontend locally
4. Once comfortable, try full stack: `docker-compose up`

Happy Trading!
