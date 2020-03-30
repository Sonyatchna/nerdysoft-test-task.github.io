import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { StorageService } from '../../services/storage.service';
import { ITaskModel } from '../../interfaces/task.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public tasks: ITaskModel[];
  private subscription: Subscription;

  constructor(
    private authorizationService: AuthorizationService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.subscribeForChanges();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public logout(): void {
    this.authorizationService.logout();
  }

  public openAddTaskModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '250px';
    dialogConfig.width = '350px';
    dialogConfig.position = {
      top: '150px'
    };
    this.dialog.open(ModalComponent, dialogConfig);
  }

  private subscribeForChanges(): void {
    this.subscription = this.storageService.$taskList.subscribe(res => {
      this.tasks = res;
    });
  }

}
