import { ComponentType } from '@angular/cdk/portal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { EditTaskNameComponent } from '@todo-app/components';
import { Task } from '@todo-app/models';
import { ConfirmDeleteTaskComponent } from '@todo-app/components';
import { HOT_TOAST_STYLES } from '@todo-app/constants';

@Component({
  selector: 'ta-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  constructor(
    private readonly dialog: MatDialog,
    private readonly toastService: HotToastService
  ) {}
  checkBoxControl = new FormControl(false);

  @Input() task: Task;
  @Input() buttonsDisabled: boolean = false;

  @Output() excludeTask = new EventEmitter<null>();
  @Output() editTaskName = new EventEmitter<string>();
  @Output() completedTask = new EventEmitter<null>();

  ngOnInit(): void {
    if (this.buttonsDisabled) this.checkBoxControl.disable();
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
    const dialogConfig = { data: taskName };
    const dialogReference = this.openDialog(
      EditTaskNameComponent,
      dialogConfig
    );

    dialogReference.afterClosed().subscribe((newTaskName) => {
      if (newTaskName) {
        this.task.name = newTaskName;
        this.editTaskName.emit(newTaskName);
        return;
      }
      this.toastService.info('Unsaved Changes', {
        style: HOT_TOAST_STYLES.info,
      });
    });
  }

  openConfirmDeleTaskModal() {
    const dialogConfig = { data: this.task };
    const dialogReference = this.openDialog(
      ConfirmDeleteTaskComponent,
      dialogConfig
    );

    dialogReference.afterClosed().subscribe((decision) => {
      if (decision) {
        this.excludeTask.emit();
        return;
      }
      this.toastService.info('Task Not Deleted', {
        style: HOT_TOAST_STYLES.info,
      });
    });
  }

  openDialog(component: ComponentType<unknown>, config: MatDialogConfig = {}) {
    const dialogReference = this.dialog.open(component, config);
    return dialogReference;
  }

  changeCompletedTaskValue() {
    const newCompletedValue = !this.task.completed;
    this.task.completed = newCompletedValue;
    this.completedTask.emit();
  }
}
