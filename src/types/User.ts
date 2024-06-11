// src/types/User.ts
export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string; // Password might be required for creation
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}
