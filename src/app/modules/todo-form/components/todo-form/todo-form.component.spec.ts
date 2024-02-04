import { TestBed } from '@angular/core/testing';
import { TodoFormComponent } from './todo-form.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        TodoFormComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit newTodo event on form submission', () => {
    component.newItem.title = 'New Task';
    jest.spyOn(component.newTodo, 'emit');
    const expectedNewItem = { ...component.newItem };
    component.onSubmit();
    expect(component.newTodo.emit).toHaveBeenCalledWith(expectedNewItem);
  });

  it('should not emit newTodo event if title is empty', () => {
    component.newItem.title = '';
    jest.spyOn(component.newTodo, 'emit');

    component.onSubmit();

    expect(component.newTodo.emit).not.toHaveBeenCalled();
  });

  it('should reset newItem after form submission', () => {
    component.newItem.title = 'New Task';
    component.onSubmit();

    expect(component.newItem.title).toBe('');
    expect(component.newItem.isCompleted).toBeFalsy();
  });
});
