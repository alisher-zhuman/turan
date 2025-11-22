export interface Company {
  id: number;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}

export interface Device {
  id: number;
  deviceId: string;
  verified: boolean;
  createdAt: string;
  isArchived: boolean;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "super_admin" | "admin" | "user" | "controller";
  company: Company | null;
  devices: Device[] | [];
  passwordChange: boolean;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}
