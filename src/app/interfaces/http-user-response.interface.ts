import { User } from './user.interface';

export interface HttpUserResponse extends User {
  token: any;
  updatedUser: User;
}
