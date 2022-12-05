import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '@todo-app/models';
import { StorageService } from '@todo-app/services';
import { SettingsComponent } from './components/settings/settings.component';
import { Settings } from './models/settings.model';

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
  settingsInCache = this.storageService.getItem('settings');

  tasks: Task[] = this.tasksInCache ? JSON.parse(this.tasksInCache) : [];
  settings: Settings = this.settingsInCache
    ? JSON.parse(this.settingsInCache)
    : this.createSettingsObj();

  constructor(
    private storageService: StorageService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    const { deleteCompletedTasks } = this.settings;
    if (deleteCompletedTasks) {
      const tasks = [...this.tasks.filter((task) => !task.completed)];
      this.tasks = tasks;
    }
  }

  createTask(event: SubmitEvent) {
    event.preventDefault();

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
  }

  editTaskName(newName: string, taskToEdit: Task) {
    taskToEdit.name = newName;
    this.saveTasksInLocalStorage();
  }

  private saveTasksInLocalStorage() {
    const tasksStringify = this.stringifyObj(this.tasks);
    this.storageService.setItem('tasks', tasksStringify);
  }

  completedTask(task: Task) {
    const newCompletedValue = !task.completed;
    task.completed = newCompletedValue;
    this.saveTasksInLocalStorage();
  }

  stringifyObj(object: Object) {
    const objectInString = JSON.stringify(object);
    return objectInString;
  }

  createSettingsObj() {
    const settings = { deleteCompletedTasks: false };
    const settingsInString = this.stringifyObj(settings);
    this.storageService.setItem('settings', settingsInString);
    return settings;
  }

  openSettingsModal() {
    const settings = { ...this.settings };
    const dialogConfig = { data: settings };
    const dialogReference = this.dialog.open(SettingsComponent, dialogConfig);

    dialogReference.afterClosed().subscribe((newSettings: Settings) => {
      const settingsHasChanged = !Object.is(settings, newSettings);
      if (settingsHasChanged) {
        this.settings = newSettings;
        const settingsInString = this.stringifyObj(newSettings);
        this.storageService.setItem('settings', settingsInString);
      }
    });
  }
}
