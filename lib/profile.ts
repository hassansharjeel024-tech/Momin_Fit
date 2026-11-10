import type { FitnessProfile } from '@prisma/client';

import type { EQUIPMENT_OPTIONS, FITNESS_LEVELS, GOALS } from '@/lib/schemas';

export type ProfileValues = {
  age: number;
  heightCm: number;
  weightKg: number;
  goal: (typeof GOALS)[number];
  fitnessLevel: (typeof FITNESS_LEVELS)[number];
  equipment: (typeof EQUIPMENT_OPTIONS)[number][];
  timezone: string;
};

export function toProfileValues(profile: FitnessProfile | null): ProfileValues | null {
  if (
    !profile ||
    profile.age === null ||
    profile.heightCm === null ||
    profile.weightKg === null ||
    profile.goal === null ||
    profile.fitnessLevel === null ||
    profile.timezone === null
  ) {
    return null;
  }
  return {
    age: profile.age,
    heightCm: profile.heightCm,
    weightKg: profile.weightKg,
    goal: profile.goal as ProfileValues['goal'],
    fitnessLevel: profile.fitnessLevel as ProfileValues['fitnessLevel'],
    equipment: profile.equipment as ProfileValues['equipment'],
    timezone: profile.timezone,
  };
}