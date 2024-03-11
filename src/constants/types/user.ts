import { Role } from '../enums';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: Role[];
}
