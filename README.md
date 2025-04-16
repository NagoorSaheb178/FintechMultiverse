# Financial Multiverse - Gen Z Fintech Prototype

A futuristic fintech prototype with user persona selection for Gen Z investors.

## Project Overview
This project includes:
- A futuristic landing page
- Investor persona selection (Innovator, Traditionalist, Adventurer, Athlete, Artist)
- Database integration for storing selected personas

## Tech Stack
- Frontend: React, Tailwind CSS, shadcn/ui components, framer-motion
- Backend: Express, Node.js
- Database: PostgreSQL with Drizzle ORM

## Deployment to Vercel

### Prerequisites
- A Vercel account
- A PostgreSQL database (e.g., Neon, Supabase, or Vercel Postgres)

### Steps to Deploy

1. Push this code to a GitHub repository

2. Sign in to Vercel and create a new project from your GitHub repository

3. Configure the following environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string

4. Deploy the application

### Database Setup
The application will automatically set up the database schema on first run. If you need to manually initialize it:
1. Access your application's deployed URL followed by `/api/init` (e.g., `https://your-app.vercel.app/api/init`)
2. This creates a test user that works with the persona selection feature

## Local Development
```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Start in production mode
npm start
```

## License
MIT