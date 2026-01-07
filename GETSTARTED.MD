# 🚀 Stock Trading Dashboard - Complete Setup Guide

## 📁 Project Structure

```
stock-trading-dashboard/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── GoogleAuth.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── MetricsBar.jsx
│   │   │   │   └── ProfileDropdown.jsx
│   │   │   ├── Stock/
│   │   │   │   ├── StockSelector.jsx
│   │   │   │   ├── StockChart.jsx
│   │   │   │   └── StockCard.jsx
│   │   │   └── Analysis/
│   │   │       ├── AISignal.jsx
│   │   │       ├── KeyIndicators.jsx
│   │   │       └── AIInsights.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   └── stock.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useStockData.js
│   │   │   └── useWebSocket.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── formatters.js
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   └── StockContext.jsx
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── stocks.py
│   │   │   ├── predictions.py
│   │   │   └── users.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── stock.py
│   │   │   └── prediction.py
│   │   ├── services/
│   │   │   ├── ml_service.py
│   │   │   ├── stock_service.py
│   │   │   └── auth_service.py
│   │   ├── middleware/
│   │   │   ├── auth.py
│   │   │   └── error_handler.py
│   │   └── utils/
│   │       ├── validators.py
│   │       └── helpers.py
│   ├── ml/
│   │   ├── models/
│   │   │   └── trained_model.pkl
│   │   ├── training/
│   │   │   ├── train.py
│   │   │   └── evaluate.py
│   │   └── preprocessing/
│   │       └── data_prep.py
│   ├── config/
│   │   ├── settings.py
│   │   └── database.py
│   ├── tests/
│   │   ├── test_auth.py
│   │   ├── test_predictions.py
│   │   └── test_stocks.py
│   ├── .env.example
│   ├── requirements.txt
│   ├── app.py
│   └── wsgi.py
├── docker/
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🔧 Frontend Setup (React + Vite)

### Step 1: Initialize Frontend

```bash
# Create project directory
mkdir stock-trading-dashboard
cd stock-trading-dashboard

# Create React app with Vite
npm create vite@latest frontend -- --template react
cd frontend
```

### Step 2: Install Dependencies

```bash
# Core dependencies
npm install

# UI & Styling
npm install tailwindcss postcss autoprefixer
npm install lucide-react

# Charts & Visualization
npm install recharts

# HTTP Client & State Management
npm install axios
npm install zustand  # or redux toolkit

# Routing
npm install react-router-dom

# Form & Validation
npm install react-hook-form zod

# Date handling
npm install date-fns

# WebSocket (for real-time updates)
npm install socket.io-client

# Development tools
npm install -D @types/node
```

### Step 3: Initialize Tailwind CSS

```bash
npx tailwindcss init -p
```

### Step 4: Configure Tailwind

**tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#000000',
        'dark-surface': '#0a0a0a',
        'dark-card': '#111111',
      },
    },
  },
  plugins: [],
}
```

**src/index.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-black text-white antialiased;
  }
}
```

### Step 5: Environment Variables

**frontend/.env.example**
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_ENV=development
```

**frontend/.gitignore**
```
# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage

# production
dist
build

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# editor
.vscode
.idea
*.swp
*.swo
*~
```

### Step 6: Package.json Scripts

**frontend/package.json**
```json
{
  "name": "stockmind-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2",
    "recharts": "^2.10.3",
    "lucide-react": "^0.294.0",
    "zustand": "^4.4.7",
    "socket.io-client": "^4.6.0",
    "react-hook-form": "^7.49.2",
    "zod": "^3.22.4",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "vite": "^5.0.8"
  }
}
```

---

## 🐍 Backend Setup (Python + Flask/FastAPI)

### Step 1: Initialize Backend

```bash
# Go back to project root
cd ..

# Create backend directory
mkdir backend
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### Step 2: Install Dependencies

```bash
pip install --upgrade pip
```

**backend/requirements.txt**
```txt
# Web Framework
fastapi==0.108.0
uvicorn[standard]==0.25.0
# or
# flask==3.0.0
# flask-cors==4.0.0

# Database
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
alembic==1.13.1

# Authentication
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
google-auth==2.25.2
google-auth-oauthlib==1.2.0

# ML & Data Science
numpy==1.26.2
pandas==2.1.4
scikit-learn==1.3.2
tensorflow==2.15.0
# or
# torch==2.1.2

# Stock Data
yfinance==0.2.33
alpha-vantage==2.3.1

# Utilities
python-dotenv==1.0.0
pydantic==2.5.3
requests==2.31.0
websockets==12.0

# Testing
pytest==7.4.3
pytest-asyncio==0.21.1

# Monitoring
sentry-sdk==1.39.2
```

Install all:
```bash
pip install -r requirements.txt
```

### Step 3: Environment Variables

**backend/.env.example**
```env
# App Config
APP_NAME=StockMind API
ENV=development
DEBUG=True
SECRET_KEY=your-secret-key-here-change-in-production

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/stockmind
# or for SQLite
# DATABASE_URL=sqlite:///./stockmind.db

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
REDIRECT_URI=http://localhost:3000/auth/callback

# JWT
JWT_SECRET_KEY=your-jwt-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# External APIs
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
FINNHUB_API_KEY=your_finnhub_key

# Redis (for caching)
REDIS_URL=redis://localhost:6379/0

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# ML Model
MODEL_PATH=./ml/models/trained_model.pkl
```

**backend/.gitignore**
```
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
ENV/
.venv

# Distribution / packaging
dist/
build/
*.egg-info/
.installed.cfg
*.egg

# ML Models
*.pkl
*.h5
*.pt
*.pth
*.onnx
ml/models/*.pkl

# Environment
.env
.env.local
.env.*.local

# Database
*.db
*.sqlite3
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Testing
.pytest_cache/
.coverage
htmlcov/

# Misc
.DS_Store
```

---

## 📦 Quick Start Files

### **frontend/src/services/api.js**

```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### **backend/app.py** (FastAPI)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="StockMind API",
    description="AI-Powered Stock Trading Analytics",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "StockMind API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
```

---

## 🚀 Running the Application

### Frontend
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

### Backend
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python app.py
# API runs on http://localhost:8000
```

---

## 📝 Additional Setup

### Database Setup (PostgreSQL)

```bash
# Install PostgreSQL
# Then create database
createdb stockmind

# Run migrations
cd backend
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

### Docker Setup (Optional)

**docker-compose.yml**
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: ../docker/Dockerfile.frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_BASE_URL=http://localhost:8000
    volumes:
      - ./frontend:/app
      - /app/node_modules

  backend:
    build:
      context: ./backend
      dockerfile: ../docker/Dockerfile.backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/stockmind
    volumes:
      - ./backend:/app
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=stockmind
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

Run with Docker:
```bash
docker-compose up -d
```

---

## ✅ Verification Checklist

- [ ] Node.js and npm installed
- [ ] Python 3.8+ installed
- [ ] PostgreSQL installed (optional)
- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Frontend runs on localhost:5173
- [ ] Backend runs on localhost:8000
- [ ] Database connected (if using)
- [ ] Google OAuth credentials configured

---

## 🎯 Next Steps

1. **Implement Authentication Flow**
2. **Create API Endpoints**
3. **Integrate ML Models**
4. **Setup WebSocket for Real-time Data**
5. **Add Testing**
6. **Setup CI/CD Pipeline**
7. **Deploy to Production**

---

## 📚 Useful Commands

```bash
# Frontend
npm install              # Install dependencies
npm run dev             # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Backend
pip install -r requirements.txt  # Install dependencies
python app.py                    # Start server
pytest                           # Run tests
alembic upgrade head             # Run migrations

# Git
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

---

## 🆘 Troubleshooting

**Port already in use:**
```bash
# Find and kill process
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9
```

**Module not found:**
```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend
pip install --upgrade pip
pip install -r requirements.txt
```

**CORS errors:**
- Check CORS_ORIGINS in backend/.env
- Ensure frontend URL is whitelisted

---

🎉 **You're all set! Happy coding!**