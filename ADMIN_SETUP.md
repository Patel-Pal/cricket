# Admin Setup Guide

## Step 1: Create Admin User

Run this command to create the admin user in your database:

```bash
npm run seed:admin
```

This will create an admin account with:
- **Email:** admin@gmail.com
- **Password:** admin123

## Step 2: Login as Admin

1. Start the server:
   ```bash
   node server.js
   ```

2. Go to: `http://localhost:3000/login`

3. Login with:
   - Email: `admin@gmail.com`
   - Password: `admin123`

## Step 3: Admin Features

After logging in, you'll be redirected to the admin dashboard where you can:

### Manage Players (`/admin/players`)

The admin can:

1. **View All Players** - See complete player information with photos
2. **Approve Players** - Approve pending player registrations
3. **Activate/Deactivate Players** - Toggle player active status
4. **Assign Player Numbers** - Give unique player numbers (e.g., P001, P002)
5. **Edit Player Details** - Update name, mobile, address, category, styles
6. **Delete Players** - Remove players from the system (also deletes their photos from Cloudinary)

### Player Information Displayed:
- Player Photo
- Name
- Player Number
- Category (Batsman, Bowler, All-rounder, Wicketkeeper)
- Mobile Number
- Date of Birth
- Address
- Batting Style
- Bowling Style
- Status (Active/Inactive)
- Approval Status (Approved/Pending)

### Action Buttons:
- ✅ **Approve** - Approve pending players
- 🔄 **Activate/Deactivate** - Toggle player status
- ✏️ **Edit** - Edit player details inline
- 🗑️ **Delete** - Remove player permanently

## Database Schema Updates

The Player model now includes:
- `playerNumber` - Unique player identifier (e.g., P001)
- `isActive` - Boolean to activate/deactivate players

## API Endpoints

- `POST /api/players/:id/approve` - Approve player
- `POST /api/players/:id/toggle-status` - Activate/Deactivate player
- `PATCH /api/players/:id` - Update player details
- `DELETE /api/players/:id/delete` - Delete player

## Security

- All admin routes are protected with NextAuth middleware
- Only users with `role: 'admin'` can access admin features
- Password is hashed with bcrypt
