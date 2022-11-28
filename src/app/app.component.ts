import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Task } from './models/task.model';
import { StorageService } from './services/storage/storage.service';

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
  tasks: Task[] = this.tasksInCache ? JSON.parse(this.tasksInCache) : [];

  constructor(private storageService: StorageService) {}

  createTask(event: SubmitEvent) {
    event.preventDefault();

    const hasRequiredError = this.newTaskNameControl.hasError('required');

    if (hasRequiredError) return;

    this.createTaskModel();
    this.saveTasksInLocalStorage();

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
    this.saveTasksInLocalStorage();
  }

  editTaskName(newName: string, taskToEdit: Task) {
    taskToEdit.name = newName;
    this.saveTasksInLocalStorage();
  }

  private saveTasksInLocalStorage() {
    const tasksStringify = JSON.stringify(this.tasks);
    this.storageService.setItem('tasks', tasksStringify);
  }
}
