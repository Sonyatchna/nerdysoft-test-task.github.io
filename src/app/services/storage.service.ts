import { Injectable } from '@angular/core';
import { ITaskModel } from '../interfaces/task.model';
import { ITaskChangesModel } from '../interfaces/task-changes.model';
import { BehaviorSubject } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { notificationMessages } from '../consts/notificationMessages';
import { LocalStorage } from '../consts/localStorageEnum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public readonly $taskList: BehaviorSubject<ITaskModel[]> = new BehaviorSubject(null);

  public get taskList(): ITaskModel[] {
    return this.$taskList.value;
  }

  public set taskList(taskListArray: ITaskModel[]) {
    this.$taskList.next(taskListArray);
  }

  constructor(
    private notifier: NotifierService
  ) {
    this.setInitialList();
  }

  public deleteTask(taskId: number): void {
    const currentTasks = this.taskList.filter(task => task.id !== taskId);
    this.setNewListOfTasks(currentTasks);

    this.successNotify(notificationMessages.taskDeleted);
  }

  public editTask(changes: ITaskChangesModel): void {
    const currentTasks = this.taskList;
    currentTasks.find(task => task.id === changes.id).name = changes.newName;
    this.setNewListOfTasks(currentTasks);

    this.successNotify(notificationMessages.taskEdited);
  }

  public addTask(task: ITaskModel): void {
    this.taskList.unshift(task);
    this.setNewListOfTasks(this.taskList);

    this.successNotify(notificationMessages.taskAdded);
  }

  public shareTask(task: ITaskModel, userEmail: string): void {
    const storageUsers = this.getItemFromLS(LocalStorage.users);
    const activeUser = this.getItemFromLS(LocalStorage.activeUser);
    const neededUser = storageUsers.find(user => user.email === userEmail);
    const itemWithMaxId = neededUser.tasks.sort((a, b) => b.id - a.id)[0];
    const id = (itemWithMaxId && itemWithMaxId.id || 0) + 1;

    neededUser.tasks.unshift({id, name: task.name, ownerId: activeUser.id});
    localStorage.setItem(LocalStorage.users, JSON.stringify(storageUsers));

    this.successNotify(notificationMessages.taskShared);
  }

  private setInitialList(): void {
    const activeUser = this.getItemFromLS(LocalStorage.activeUser);
    this.taskList = activeUser && activeUser.tasks ? activeUser.tasks : [];
  }

  private setNewListOfTasks(taskList: ITaskModel[]): void {
    const users = this.getItemFromLS(LocalStorage.users);
    const activeUser = this.getItemFromLS(LocalStorage.activeUser);

    activeUser.tasks = users.find(user => user.id === activeUser.id).tasks = taskList;

    localStorage.setItem(LocalStorage.users, JSON.stringify(users));
    localStorage.setItem(LocalStorage.activeUser, JSON.stringify(activeUser));

    this.taskList = taskList;
  }

  private successNotify(message: string): void {
    this.notifier.notify('success', message);
  }

  private getItemFromLS(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

}
