import { Injectable } from '@angular/core';
import { IUserModel } from '../interfaces/user.model';
import { DataBaseService } from './data-base.service';
import { NotifierService } from 'angular-notifier';
import { notificationMessages } from '../consts/notificationMessages';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { ITaskModel } from '../interfaces/task.model';
import { LocalStorage } from '../consts/localStorageEnum';
import { Navigation } from '../consts/navigationEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private dataBaseService: DataBaseService,
    private storageService: StorageService,
    private notifier: NotifierService,
    private router: Router
  ) { }

  public login(body): void {
    const currentUsers = this.dataBaseService.userList;
    const neededUser = currentUsers.find(user => user.email === body.email);

    if (!neededUser) {
      this.errorNotify(notificationMessages.userNotExists);
      return;
    }

    if (neededUser.password !== body.password) {
      this.errorNotify(notificationMessages.notCorrectPass);
      return;
    }

    this.handleAuthorizedStatus(neededUser, currentUsers);
    localStorage.setItem(LocalStorage.activeUser, JSON.stringify(neededUser));
    this.setListOfTasks(neededUser.tasks);
    this.router.navigate([Navigation.list]);

    this.successNotify(notificationMessages.successfulAuthorization);
  }

  public handleAuthorizedStatus(neededUser, currentUsers): void {
    neededUser.isAuthorized = true;
    currentUsers.forEach(user => {
      if (user.email !== neededUser.email) {
        user.isAuthorized = false;
      }
    });
    this.dataBaseService.setNewListOfUsers(currentUsers);
  }

  public logout(): void {
    const activeUser = this.getItemFromLS(LocalStorage.activeUser);
    const currentUsers = this.getItemFromLS(LocalStorage.users);

    currentUsers.find(user => user.email === activeUser.email).isAuthorized = false;
    this.dataBaseService.setNewListOfUsers(currentUsers);
    localStorage.removeItem(LocalStorage.activeUser);
    this.router.navigate([Navigation.login]);
    this.setListOfTasks([]);
  }

  public register(user: IUserModel): void {
    const userWithMaxId = this.dataBaseService.userList.sort((a, b) => b.id - a.id)[0];
    const id = (userWithMaxId && userWithMaxId.id || 0) + 1;
    const currentUsers = this.dataBaseService.userList;
    const neededUser = currentUsers.find(el => el.email === user.email);

    if (neededUser) {
      this.errorNotify(notificationMessages.userExists);
      return;
    }
    currentUsers.push(Object.assign({ id, isAuthorized: false, tasks: []}, user));
    this.dataBaseService.setNewListOfUsers(currentUsers);
    this.successNotify(notificationMessages.successfulRegistration);
    this.router.navigate([Navigation.login]);
  }

  private setListOfTasks(tasks: ITaskModel[]): void {
    this.storageService.taskList = tasks;
  }

  private successNotify(message: string): void {
    this.notifier.notify('success', message);
  }

  private errorNotify(message: string): void {
    this.notifier.notify('error', message);
  }

  private getItemFromLS(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
