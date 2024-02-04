import { TodoItemComponent } from './todo-item.component';
import { TodoItem } from '../../models/todo-item.model';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        NoopAnimationsModule,
        TodoItemComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.item = { id: 1, title: 'Test Todo', isCompleted: false };

    fixture.detectChanges();
  });

  it('should create', () => {
    component.item = { id: 1, title: 'Test Todo', isCompleted: false };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display todo item title', () => {
    const testItem: TodoItem = {
      id: 1,
      title: 'Test Todo',
      isCompleted: false,
    };
    component.item = testItem;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.todo-title').textContent).toContain(
      'Test Todo'
    );
  });

  it('should emit delete event on delete button click', () => {
    jest.spyOn(component.delete, 'emit');
    component.onDelete();
    expect(component.delete.emit).toHaveBeenCalledWith(component.item.id);
  });

  it('should emit toggleComplete event on checkbox change', () => {
    jest.spyOn(component.toggleComplete, 'emit');
    const testItem: TodoItem = {
      id: 1,
      title: 'Test Todo',
      isCompleted: false,
    };
    component.item = testItem;
    component.onToggleComplete();
    expect(component.toggleComplete.emit).toHaveBeenCalledWith({
      ...testItem,
      isCompleted: true,
    });
  });
});
