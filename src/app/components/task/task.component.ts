import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { EditTaskNameComponent } from '../edit-task-name/edit-task-name.component';

@Component({
  selector: 'ta-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  constructor(private readonly dialog: MatDialog) {}

  @Input() task: Task;
  @Output() excludeTask = new EventEmitter<null>();
  @Output() editTaskName = new EventEmitter<string>();

  emitEvent(propertyName: 'excludeTask' | 'editTaskName') {
    const eventEmitter = this[propertyName];
    eventEmitter.emit();
  }

  openDialog(): void {
    const taskName = this.task.name;
    const dialogRef = this.dialog.open(EditTaskNameComponent, {
      data: taskName,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.task.name = result;
      this.editTaskName.emit(result);
    });
  }
}
