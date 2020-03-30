import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { ITaskModel } from '../../../interfaces/task.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalComponent } from '../../modal/modal.component';
import { ShareTaskModalComponent } from '../../share-task-modal/share-task-modal.component';
import { IUserModel } from '../../../interfaces/user.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  public users: IUserModel[];
  public activeUser: IUserModel;
  public ownerEmail: string;
  @Input() task: ITaskModel;
  @ViewChild('newName', {static: false}) newName: ElementRef;

  constructor(
    private storageService: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('users'));
    this.activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (this.task.ownerId !== this.activeUser.id) {
      this.ownerEmail = this.detectUserEmailByTaskOwnerId();
    }
  }

  public detectUserEmailByTaskOwnerId(): string {
    return this.users.find(user => user.id === this.task.ownerId).email;
  }

  public shareTask(): void {
    this.dialog.open(ShareTaskModalComponent, this.getDialogConfig(this.task));
  }

  public editTask(task: ITaskModel): void {
    this.dialog.open(ModalComponent, this.getDialogConfig(task));
  }

  public deleteTask(taskId: number): void {
    this.storageService.deleteTask(taskId);
  }

  private getDialogConfig(data): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '250px';
    dialogConfig.width = '350px';
    dialogConfig.data = data;
    dialogConfig.position = {
      top: '150px'
    };
    return dialogConfig;
  }

}
