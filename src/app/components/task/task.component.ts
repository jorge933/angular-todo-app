import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskNameComponent } from '@todo-app/components';
import { Task } from '@todo-app/models';

@Component({
  selector: 'ta-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  constructor(private readonly dialog: MatDialog) {}

  checkBoxControl = new FormControl(false);

  @Input() task: Task;

  @Output() excludeTask = new EventEmitter<null>();
  @Output() editTaskName = new EventEmitter<string>();
  @Output() completedTask = new EventEmitter<null>();

  ngOnInit(): void {
    const checkBoxControl = this.checkBoxControl;

    checkBoxControl.setValue(this.task.completed);

    checkBoxControl.valueChanges.subscribe((boolean) => {
      this.task.completed = !!boolean;
      this.changeCompletedTaskValue();
    });
  }

  emitEvent(propertyName: keyof TaskComponent) {
    const eventEmitter = this[propertyName] as EventEmitter<keyof this>;
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
