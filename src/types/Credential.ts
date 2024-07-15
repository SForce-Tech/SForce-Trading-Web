// src/types/Credentials.ts
export interface Credential {
  id?: number;
  consumerKey: string;
  consumerSecret: string;
  isSandbox: boolean;
  isActive: boolean;
  userId: number;
}
