import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Task } from '@todo-app/models';
import { StorageService } from '@todo-app/services';

@Component({
  selector: 'ta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  newTaskNameControl = new FormControl<string>('', [
    Validators.required,
    Validators.maxLength(16),
  ]);

  tasksInCache = this.storageService.getItem('tasks');

  private _tasks: Task[] = this.tasksInCache
    ? JSON.parse(this.tasksInCache)
    : [];

  set tasks(tasks: Task[]) {
    this._tasks = tasks;
    this.saveTasksInLocalStorage();
  }

  get tasks() {
    return this._tasks;
  }

  constructor(private storageService: StorageService) {}

  createTask(event: SubmitEvent) {
    event.preventDefault();

    this.createTaskModel();

    this.newTaskNameControl.reset();
  }

  private createTaskModel() {
    const id = this.generateId();
    const name = this.newTaskNameControl.value as string;
    const task = { id, name, completed: false };
    this.tasks.push(task);
  }

  private generateId() {
    const lastTask = this.tasks[this.tasks.length - 1];
    const id = lastTask?.id + 1 || 1;
    return id;
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

  private saveTasksInLocalStorage() {
    const tasksStringify = JSON.stringify(this.tasks);
    this.storageService.setItem('tasks', tasksStringify);
  }

  completedTask(task: Task) {
    const newCompletedValue = !task.completed;
    task.completed = newCompletedValue;
  }
}
