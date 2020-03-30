import { Component, Inject, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IUserModel } from '../../interfaces/user.model';
import { ITaskModel } from '../../interfaces/task.model';

@Component({
  selector: 'app-share-task-modal',
  templateUrl: './share-task-modal.component.html',
  styleUrls: ['./share-task-modal.component.scss']
})
export class ShareTaskModalComponent implements OnInit {

  public selectedEmail: string;
  public users: IUserModel[];

  constructor(
    public dialogRef: MatDialogRef<ShareTaskModalComponent>,
    private storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public task
  ) { }

  ngOnInit() {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    this.users = JSON.parse(localStorage.getItem('users')).filter(user => user.id !== activeUser.id);
  }

  public shareTask(task: ITaskModel, selectedEmail: string): void {
    this.storageService.shareTask(this.task, selectedEmail);
    this.closeModal();
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

}
