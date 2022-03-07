export const PUBLIC_ONLY = 'public-only';
export const CREATOR = 'creator';
export const AUTH = 'auth';
export const SEEKER = 'seeker';

export type AuthType = typeof PUBLIC_ONLY
  | typeof AUTH
  | typeof CREATOR
  | typeof SEEKER;
