import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TASKS_MOCK } from 'src/app/mocks/tasks.mock';
import { EditTaskNameComponent } from '../edit-task-name/edit-task-name.component';
import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let fixture: ComponentFixture<TaskComponent>;
  let component: TaskComponent;
  const task = TASKS_MOCK[0];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskComponent, EditTaskNameComponent],
      imports: [MatDialogModule],
    }).compileComponents();
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = task;
  });

  it('should emit event of deletion of a task', () => {
    const excludeTask = component.excludeTask;
    spyOn(excludeTask, 'emit');

    excludeTask.emit();

    fixture.detectChanges();

    expect(excludeTask.emit).toHaveBeenCalled();
  });

  it('should emit a value when user edit a task', () => {
    const editTaskName = component.editTaskName;
    spyOn(editTaskName, 'emit');
    const valueToEmit = 'foo';

    editTaskName.emit(valueToEmit);

    fixture.detectChanges();

    expect(editTaskName.emit).toHaveBeenCalledWith(valueToEmit);
  });
});
