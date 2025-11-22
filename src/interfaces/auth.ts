export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "super_admin" | "admin" | "user";
  company: string | null;
  devices: string[];
  passwordChange: boolean;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}
