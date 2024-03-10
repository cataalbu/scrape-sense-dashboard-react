import { Role } from '../enums';

export type User = {
  id: string;
  email: string;
  name: string;
  roles: Role[];
};
