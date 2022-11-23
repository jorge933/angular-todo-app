import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TASKS_MOCK } from './mocks/tasks.mock';
import { Task } from './models/task';

@Component({
  selector: 'ta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  newTaskNameControl = new FormControl<string>('', [Validators.required]);
  tasks: Task[] = TASKS_MOCK;

  createTask(event: SubmitEvent) {
    event.preventDefault();

    const hasRequiredError = this.newTaskNameControl.hasError('required');

    if (hasRequiredError) return;

    this.createTaskModel();

    this.newTaskNameControl.reset();
  }

  private createTaskModel() {
    const id = this.generateId();
    const name = this.newTaskNameControl.value;
    const task = { id, name };
    this.tasks.push(task);
  }

  private generateId() {
    const lastTask = this.tasks[this.tasks.length - 1];
    const lastId = lastTask?.id || 1;
    return lastId;
  }

  excludeTask(taskToExclude: Task) {
    const tasks = [
      ...this.tasks.filter((task) => task.id !== taskToExclude.id),
    ];
    this.tasks = tasks;
  }

  editTaskName(newName: string, taskToEdit: Task) {
    taskToEdit.name = newName;
  }
}
