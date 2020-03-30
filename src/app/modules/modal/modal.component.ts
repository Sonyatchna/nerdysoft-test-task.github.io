import { Component, Inject, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public editMode;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public task
    ) { }

  ngOnInit() {
    if (this.task) {
      this.editMode = true;
    }
  }

  public addTask(taskName: HTMLInputElement): void {
    const itemWithMaxId = this.storageService.$taskList.value.sort((a, b) => b.id - a.id)[0];
    this.storageService.addTask({
      id: (itemWithMaxId && itemWithMaxId.id || 0) + 1,
      name: taskName.value,
      ownerId: JSON.parse(localStorage.getItem('activeUser')).id
    });
    taskName.value = '';
    this.closeModal();
  }

  public editTask(taskName: HTMLInputElement): void {
    this.storageService.editTask({
      id: this.task.id,
      newName: taskName.value
    });
    this.closeModal();
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

}
