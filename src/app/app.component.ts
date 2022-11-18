import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TASKS_MOCK } from './mocks/tasks.mock';
import { Task } from './models/task';

@Component({
  selector: 'ta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  newTaskName = new FormControl('');
  tasks: Task[] = TASKS_MOCK;

  createTask(event: SubmitEvent) {
    event.preventDefault();
    const id = this.generateId();
    const name = this.newTaskName.value as string;
    this.newTaskName.setValue(null);
    const taskObj = { id, name };
    this.tasks.push(taskObj);
  }

  private generateId() {
    const tasksLength = this.tasks.length;
    const lastIndex = tasksLength - 1;
    const lastTask = this.tasks[lastIndex];
    const lastId = lastTask?.id || 1;
    return lastId;
  }

  excludeTask(taskToExclude: Task) {
    const taskObj = this.tasks.filter((task) => task.id !== taskToExclude.id);
    this.tasks = taskObj;
  }

  editTaskName(newName: string, taskToEdit: Task) {
    this.tasks.find((task, index) => {
      const taskToEditId = taskToEdit.id;
      const taskId = task.id;
      const isTaskToEdit = taskToEditId === taskId;
      if (isTaskToEdit) {
        this.tasks[index].name = newName;
      }
    });
  }
}
