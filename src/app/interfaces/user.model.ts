import { ITaskModel } from './task.model';

export interface IUserModel {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  isAuthorized: boolean;
  tasks: ITaskModel[];
}
