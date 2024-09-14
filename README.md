# Travel Agency Portal

## Project Overview - opis projekta
This is a web application for a travel agency portal. It allows users to view travel offers, register, ask questions, and sign up for trips. Admins can manage users and travel offers.

## Technologies Used - koristene tehnologije
- Backend: Node.js, Express, MongoDB
- Frontend: React, Axios, React Router
- Authentication: JSON Web Tokens (JWT)
- Styling: Bootstrap/MUI

## Setup Instructions - koraci za pokretanje projekta
1. Clone the repository or download zip file
2. Install dependencies for both backend and frontend
backend: It must not open any folder
npm install
frontend:
cd client
npm install

3. Start the backend server - pokretanje bekend servera
npm start

4. Start the frontend development server - pokretanje frontend servera

cd client
npm run build
npm run dev


## API Endpoints - api rute
- \POST /api/users/register\: Register a new user
- \POST /api/users/login\: Login a user
- \GET /api/users\: Get all users (admin only)
- \GET /api/trips\: Get all trips
- \GET /api/trips/:id\: Get a single trip
- \POST /api/trips\: Create a new trip (admin only)
- \PUT /api/trips/:id\: Update a trip (admin only)
- \DELETE /api/trips/:id\: Delete a trip (admin only)
