import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '@todo-app/models';

@Component({
  selector: 'ta-confirm-delete-task',
  templateUrl: './confirm-delete-task.component.html',
  styleUrls: ['./confirm-delete-task.component.scss'],
})
export class ConfirmDeleteTaskComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public task: Task) {}
}
