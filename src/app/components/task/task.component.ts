import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
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
  @Output() completedTask = new EventEmitter<null>();

  emitEvent(propertyName: keyof TaskComponent) {
    const eventEmitter = this[propertyName] as EventEmitter<unknown>;
    eventEmitter.emit();
  }

  openModalEditTaskName(): void {
    const taskName = this.task.name;
    const dialogReference = this.dialog.open(EditTaskNameComponent, {
      data: taskName,
    });

    dialogReference.afterClosed().subscribe((newTaskName) => {
      if (newTaskName) {
        this.task.name = newTaskName;
        this.editTaskName.emit(newTaskName);
      }
    });
  }

  changeCompletedTaskValue() {
    const newCompletedValue = !this.task.completed;
    this.task.completed = newCompletedValue;
    this.completedTask.emit();
  }
}
