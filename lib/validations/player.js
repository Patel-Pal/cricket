import { z } from 'zod';

export const playerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  dob: z.string().min(1, 'Date of birth is required'),
  mobile: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid mobile number'),
  email: z.string().email('Invalid email address').optional(),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required').optional(),
  state: z.string().min(2, 'State is required').optional(),
  country: z.string().min(2, 'Country is required').optional(),
  category: z.enum(['batsman', 'bowler', 'allrounder', 'wicketkeeper']),
  battingStyle: z.enum(['right-hand', 'left-hand', 'none']),
  bowlingStyle: z.enum(['right-arm-fast', 'left-arm-fast', 'right-arm-spin', 'left-arm-spin', 'none']),
  basePrice: z.number().min(0, 'Base price must be positive').optional(),
  experience: z.number().min(0, 'Experience must be positive').optional(),
  matchesPlayed: z.number().min(0, 'Matches played must be positive').optional(),
  runs: z.number().min(0, 'Runs must be positive').optional(),
  wickets: z.number().min(0, 'Wickets must be positive').optional(),
  strikeRate: z.number().min(0, 'Strike rate must be positive').optional(),
  photo: z.object({
    url: z.string(),
    publicId: z.string(),
  }).optional().nullable(),
  identityProof: z.object({
    url: z.string(),
    publicId: z.string(),
  }).optional().nullable(),
});

export const teamSchema = z.object({
  teamName: z.string().min(2, 'Team name must be at least 2 characters'),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
  budget: z.number().min(0, 'Budget must be positive'),
  maxPlayers: z.number().min(1, 'Max players must be at least 1'),
});

export const bidSchema = z.object({
  bidAmount: z.number().min(0, 'Bid amount must be positive'),
  teamId: z.string().min(1, 'Team ID is required'),
  playerId: z.string().min(1, 'Player ID is required'),
});
