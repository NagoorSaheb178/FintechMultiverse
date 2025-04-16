# Financial Multiverse Application

A Gen Z-focused fintech application designed to make financial learning and investment accessible through interactive, personalized experiences.

## Project Structure

The project is organized into three main directories:

- `/frontend` - Contains the React frontend code built with Vite
- `/backend` - Contains the Express.js server code
- `/database` - Contains database schema and Supabase integration

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- PostgreSQL database
- Supabase account (optional but recommended)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=postgresql://username:password@hostname:port/database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up the database:
   ```
   npm run db:push
   ```

## Running the Application

1. Start the development server:
   ```
   npm run dev
   ```
2. Open your browser and navigate to http://localhost:5000

## Deployment

The application can be deployed to Vercel with the following command:
```
vercel
```

## Features

- Interactive landing page with modern design
- Persona selection experience with 5 financial archetypes:
  - Innovator
  - Traditionalist
  - Adventurer
  - Athlete
  - Artist
- Backend API integration with PostgreSQL database
- Integration with Supabase for user management and data storage

## Technology Stack

- Vite + React for frontend
- Express.js for backend
- Supabase for database and authentication
- Drizzle ORM for database management
- Tailwind CSS for styling
- TypeScript for type safety