# CivicX - Smart Complaint Resolution Platform

CivicX is an AI-powered public safety platform connecting citizens with authorities through intelligent complaint routing, real-time tracking, rewards, and civic engagement.

## Features

**Citizen**
- Register/Login
- Raise a complaint (with photos, location, category)
- Track complaint statuses
- Emergency SOS button
- Civic Rewards system & learning
- Report Fraud

**Government Official**
- Official dashboard
- View and update assigned complaints
- Approve resolution proofs

**Admin**
- Analytics dashboard
- Complaints heat map / category charts
- User management stats

## Technology Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Zustand
- **Backend**: Node.js, Express.js, JWT, Mongoose
- **Database**: MongoDB

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Database Setup
Ensure MongoDB is running locally on `mongodb://127.0.0.1:27017/civicx`.
You can seed dummy data (Admin, Official, Citizen, and dummy complaints):
```bash
cd backend
npm install
node seed.js
```

### 2. Run Backend
```bash
cd backend
npm start
```
*Backend runs on http://localhost:5000*

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on http://localhost:5173 (or 5174)*

## Login Credentials (from Seed)
- **Admin**: `admin@civicx.com` / `password123`
- **Official**: `official@civicx.com` / `password123`
- **Citizen**: `citizen@civicx.com` / `password123`
