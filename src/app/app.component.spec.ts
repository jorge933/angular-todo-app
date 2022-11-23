import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create a task', () => {
    const $app = fixture.nativeElement;
    const $form = $app.querySelector('form');
    const submitEvent = new Event('submit');
    const tasksArrayLength = component.tasks.length;
    const newLengthExpected = tasksArrayLength + 1;

    component.newTaskNameControl.setValue('Work');
    $form.dispatchEvent(submitEvent);

    const newTasksArrayLength = component.tasks.length;

    expect(newLengthExpected).toBe(newTasksArrayLength);
  });

  it('should exclude a task', () => {
    const taskToExclude = component.tasks[0];
    const tasksLength = component.tasks.length;
    const newTasksLength = tasksLength - 1;

    component.excludeTask(taskToExclude);
    const newLength = component.tasks.length;

    expect(newTasksLength).toBe(newLength);
  });

  it('should edit a task', () => {
    const newTaskName = 'Fun';
    const taskToEdit = component.tasks[0];

    component.editTaskName(newTaskName, taskToEdit);

    const task = component.tasks[0];
    const { name: taskName } = task;

    expect(newTaskName).toBe(taskName ?? '');
  });
});
