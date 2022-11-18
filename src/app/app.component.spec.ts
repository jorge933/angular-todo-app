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

    component.newTaskName.setValue('Work');
    $form.dispatchEvent(submitEvent);

    const newTasksArrayLength = component.tasks.length;

    expect(newLengthExpected).toBe(newTasksArrayLength);
  });

});
