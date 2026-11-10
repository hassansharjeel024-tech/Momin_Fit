import { z } from 'zod';

export const GOALS = ['lose_weight', 'build_muscle', 'stay_fit'] as const;
export const FITNESS_LEVELS = ['beginner', 'intermediate', 'advanced'] as const;
export const EQUIPMENT_OPTIONS = [
  'none',
  'dumbbells',
  'resistance_bands',
  'pull_up_bar',
  'full_gym',
] as const;

export const GOAL_LABELS: Record<(typeof GOALS)[number], string> = {
  lose_weight: 'Lose weight',
  build_muscle: 'Build muscle',
  stay_fit: 'Stay fit',
};

export const LEVEL_LABELS: Record<(typeof FITNESS_LEVELS)[number], string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export const EQUIPMENT_LABELS: Record<(typeof EQUIPMENT_OPTIONS)[number], string> = {
  none: 'No equipment',
  dumbbells: 'Dumbbells',
  resistance_bands: 'Resistance bands',
  pull_up_bar: 'Pull-up bar',
  full_gym: 'Full gym',
};

function isValidTimeZone(timeZone: string) {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone });
    return true;
  } catch {
    return false;
  }
}

function isValidDay(day: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return false;
  const parsed = new Date(`${day}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === day;
}

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name').max(60),
  email: z.string().trim().toLowerCase().email('Enter a valid email').max(120),
  password: z.string().min(8, 'Use at least 8 characters').max(72),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(72),
});

export const profileSchema = z.object({
  age: z.number().int().min(13).max(100),
  heightCm: z.number().min(100).max(250),
  weightKg: z.number().min(30).max(300),
  goal: z.enum(GOALS),
  fitnessLevel: z.enum(FITNESS_LEVELS),
  equipment: z.array(z.enum(EQUIPMENT_OPTIONS)).min(1).max(EQUIPMENT_OPTIONS.length),
  timezone: z.string().min(1).max(64).refine(isValidTimeZone, 'Unknown time zone'),
});

export const workoutLogSchema = z.object({
  date: z.string().refine(isValidDay, 'Invalid date'),
  exerciseName: z.string().trim().min(1, 'Enter an exercise').max(80),
  durationMinutes: z.number().int().min(1).max(300),
  notes: z
    .string()
    .trim()
    .max(300)
    .optional()
    .transform((value) => (value ? value : null)),
});

export const dayParamSchema = z.string().refine(isValidDay, 'Invalid date');