import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Task } from '@todo-app/models';
import { StorageService } from '@todo-app/services';
import { SettingsComponent } from '@todo-app/components';
import { Settings } from '@todo-app/models';
import { HOT_TOAST_STYLES } from '@todo-app/constants';
import { BehaviorSubject } from 'rxjs';
import { Keys, ObjectType } from '@todo-app/models';

@Component({
  selector: 'ta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  maxLength = 16;
  newTaskNameControl = new FormControl<string>('', [
    Validators.required,
    Validators.maxLength(this.maxLength),
  ]);

  tasksInCache = this.storageService.getItem('tasks');
  settingsInCache = this.storageService.getItem('settings');

  settingsParsed: Settings = this.settingsInCache
    ? JSON.parse(this.settingsInCache)
    : this.createSettingsObj();
  tasksParsed = this.tasksInCache ? JSON.parse(this.tasksInCache) : [];

  tasks$$ = new BehaviorSubject<Task[]>(this.tasksParsed);
  settings$$ = new BehaviorSubject<Settings>(this.settingsParsed);

  constructor(
    private readonly storageService: StorageService,
    private readonly dialog: MatDialog,
    private readonly toastService: HotToastService
  ) {}

  ngOnInit() {
    const { deleteCompletedTasks } = this.settings$$.value;
    if (deleteCompletedTasks) {
      const tasks = [...this.tasks$$.value.filter((task) => !task.completed)];
      this.tasks$$.next(tasks);
    }

    this.tasks$$.subscribe(this.saveTasksInLocalStorage);
    this.settings$$.subscribe(this.saveSettingsInLocalStorage);
  }

  get buttonDisabledCondition() {
    return (
      this.newTaskNameControl.hasError('required') ||
      this.newTaskNameControl.hasError('maxlength')
    );
  }

  createTask(event: SubmitEvent) {
    event.preventDefault();

    this.createTaskModel();
    this.saveTasksInLocalStorage();

    this.newTaskNameControl.reset();

    this.toastService.success('Task Created Successfully', {
      style: HOT_TOAST_STYLES.success,
    });
  }

  private createTaskModel() {
    const id = this.generateId();
    const name = this.newTaskNameControl.value as string;
    const task = { id, name, completed: false };
    const tasks = this.tasks$$.value;
    tasks.push(task);
    this.tasks$$.next(tasks);
  }

  private generateId() {
    const tasks = this.tasks$$.value;
    const lastTask = tasks[tasks.length - 1];
    const id = lastTask?.id + 1 || 1;
    return id;
  }

  excludeTask(taskToExclude: Task) {
    const tasks = [
      ...this.tasks$$.value.filter((task) => task.id !== taskToExclude.id),
    ];
    this.tasks$$.next(tasks);

    this.toastService.success('Task Deleted Successfully', {
      style: HOT_TOAST_STYLES.success,
    });
  }

  editTaskName(newName: string, index: number) {
    const tasks = this.tasks$$.value;
    tasks[index].name = newName;
    this.tasks$$.next(tasks);

    this.toastService.success('Saved Changes', {
      style: HOT_TOAST_STYLES.success,
    });
  }

  private saveTasksInLocalStorage() {
    const tasks = this.tasks$$?.value;
    if (!tasks) return;
    const tasksStringify = JSON.stringify(tasks);
    this.storageService.setItem('tasks', tasksStringify);
  }

  completedTask(index: number) {
    const tasks = this.tasks$$.value;
    const task = tasks[index];
    const newCompletedValue = !task.completed;
    task.completed = newCompletedValue;
    this.tasks$$.next(tasks);
  }

  createSettingsObj() {
    const settings = { deleteCompletedTasks: false };
    const settingsInString = JSON.stringify(settings);
    this.storageService.setItem('settings', settingsInString);
    return settings;
  }

  openSettingsModal() {
    const settings = { ...this.settings$$.value };
    const dialogConfig = { data: settings };
    const dialogReference = this.dialog.open(SettingsComponent, dialogConfig);

    dialogReference.afterClosed().subscribe((newSettings: Settings) => {
      const isObject = typeof newSettings === 'object';
      const settingsHasChanged = this.objectHasChanges(settings, newSettings);

      if (isObject && settingsHasChanged) {
        this.settings$$.next(newSettings);

        this.toastService.success('Saved Changes', {
          style: HOT_TOAST_STYLES.success,
        });
        return;
      }
      this.toastService.info('Unsaved Changes', {
        style: HOT_TOAST_STYLES.info,
      });
    });
  }

  saveSettingsInLocalStorage() {
    const settings = this.settings$$?.value;
    if (!settings) return;
    const tasksStringify = JSON.stringify(settings);
    this.storageService.setItem('tasks', tasksStringify);
  }

  objectHasChanges(oldObject: ObjectType, newObject: ObjectType) {
    const keys = Object.keys(oldObject) as Keys;

    const objectHasChanges = keys.every(
      (key) => oldObject[key] !== newObject[key]
    );
    return objectHasChanges;
  }
}
