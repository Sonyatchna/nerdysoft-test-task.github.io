import { Injectable } from '@angular/core';
import { IUserModel } from '../interfaces/user.model';
import { BehaviorSubject } from 'rxjs';
import { LocalStorage } from '../consts/localStorageEnum';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private readonly $userList: BehaviorSubject<IUserModel[]> = new BehaviorSubject(null);

  public get userList(): IUserModel[] {
    return this.$userList.value;
  }

  public set userList(userListArray: IUserModel[]) {
    this.$userList.next(userListArray);
  }

  constructor() {
    this.setInitialListOfUsers();
  }

  public setNewListOfUsers(userList: IUserModel[]): void {
    localStorage.setItem(LocalStorage.users, JSON.stringify(userList));
    this.userList = userList;
  }

  private setInitialListOfUsers(): void {
    const listOfUsersFromLS = JSON.parse(localStorage.getItem(LocalStorage.users));
    this.userList = listOfUsersFromLS ? listOfUsersFromLS : [];
  }
}
