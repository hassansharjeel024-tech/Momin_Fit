export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const isNonEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

export const isMinLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

export const passwordsMatch = (a: string, b: string): boolean => {
  return a === b;
};
