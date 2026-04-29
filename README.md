# Cricket Auction Platform

A full-stack cricket player auction platform built with Next.js 14, MongoDB, Socket.io, and NextAuth.js.

## Features

### Authentication System
- Role-based authentication (Admin, Team Owner, Viewer)
- JWT-based session management
- Secure password hashing with bcrypt

### Player Management
- Comprehensive player registration form
- Admin approval system
- Player profiles with stats and photos
- Cloudinary integration for image uploads

### Team Management
- Team creation and management
- Budget tracking
- Player roster management
- Real-time budget updates

### Live Auction Engine
- Real-time bidding with Socket.io
- Auction timer with auto-countdown
- Live bid updates across all clients
- Admin controls (start, pause, end, select player)
- Automatic budget deduction
- Player assignment to winning team

### Points & Leaderboard System
- Automatic points calculation based on:
  - Runs (1 point per run)
  - Wickets (25 points per wicket)
  - Catches (8 points per catch)
  - Sixes (2 points per six)
  - Economy rate bonuses
- Real-time leaderboard updates
- Team rankings

### Admin Panel
- Player approval system
- Team creation and management
- Auction control panel
- Match result entry system
- Force assign players
- Reset auction functionality

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas with Mongoose
- **Authentication**: NextAuth.js
- **Real-time**: Socket.io
- **State Management**: Zustand
- **Validation**: Zod
- **File Upload**: Cloudinary
- **UI**: Tailwind CSS, React Hot Toast, Lucide Icons

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── owner/             # Owner pages
│   ├── viewer/            # Viewer pages
│   └── auction/           # Auction pages
├── components/            # React components
├── models/                # Mongoose models
├── services/              # Business logic
├── lib/                   # Utilities
├── store/                 # Zustand stores
└── hooks/                 # Custom hooks
```

## API Routes

- `/api/auth/*` - Authentication
- `/api/players` - Player CRUD
- `/api/teams` - Team CRUD
- `/api/auction/*` - Auction control
- `/api/matches` - Match management
- `/api/leaderboard` - Leaderboard data
- `/api/upload` - File uploads

## Database Collections

- users
- players
- teams
- bids
- auctions
- transactions
- matches
- playerStats
- leaderboard
- notifications

## Default Roles

1. **Admin**: Full system control
2. **Team Owner**: Bid on players, manage team
3. **Viewer**: View auction and leaderboard

## License

MIT
