import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskComponent } from '@todo-app/components';
import { TASKS_MOCK } from '@todo-app/mocks';

describe('TaskComponent', () => {
  let fixture: ComponentFixture<TaskComponent>;
  let component: TaskComponent;

  const [firstTask] = TASKS_MOCK;
  const methodName = 'emit';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = firstTask;
  });

  it('should emit event of deletion of a task', () => {
    const excludeTask = component.excludeTask;

    spyOn(excludeTask, methodName);

    excludeTask.emit();

    expect(excludeTask.emit).toHaveBeenCalled();
  });

  it('should emit a value when user edit a task', () => {
    const editTaskName = component.editTaskName;

    spyOn(editTaskName, methodName);

    const valueToEmit = 'foo';

    editTaskName.emit(valueToEmit);

    expect(editTaskName.emit).toHaveBeenCalledWith(valueToEmit);
  });

  it('should emit a value when user completed a task', () => {
    const completedTask = component.completedTask;

    spyOn(completedTask, methodName);

    completedTask.emit();

    expect(completedTask.emit).toHaveBeenCalled();
  });
});
