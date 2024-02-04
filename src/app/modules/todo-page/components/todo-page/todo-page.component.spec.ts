import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoPageComponent } from './todo-page.component';
import { TodoListService } from '../../../todo-list/service/todo-list.service';
import { TodoItem } from '../../../todo-list/models/todo-item.model';
import { of } from 'rxjs';

const todoListServiceMock = {
  addTodo: jest.fn(),
  onDelete: jest.fn(),
  onToggleComplete: jest.fn(),
  setFilterStatus: jest.fn(),
  itemCount$: of(3),
  pendingCount$: of(1),
  filteredTodos$: of([]),
};

describe('TodoPageComponent', () => {
  let component: TodoPageComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoPageComponent, BrowserAnimationsModule], // Importa TodoPageComponent y BrowserAnimationsModule
      providers: [{ provide: TodoListService, useValue: todoListServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addTodo from TodoListService on new todo item', () => {
    const testTodo: TodoItem = {
      id: 1,
      title: 'Test Todo',
      isCompleted: false,
    };
    component.addTodo(testTodo);
    expect(todoListServiceMock.addTodo).toHaveBeenCalledWith(testTodo);
  });

  it('should call onDelete from TodoListService when delete event is emitted', () => {
    const todoId = 1;
    component.onDelete(todoId);
    expect(todoListServiceMock.onDelete).toHaveBeenCalledWith(todoId);
  });

  it('should call onToggleComplete from TodoListService when toggleComplete event is emitted', () => {
    const testTodo: TodoItem = {
      id: 1,
      title: 'Test Todo',
      isCompleted: false,
    };
    component.onToggleComplete(testTodo);
    expect(todoListServiceMock.onToggleComplete).toHaveBeenCalledWith(testTodo);
  });

  it('should call setFilterStatus from TodoListService when filter is changed', () => {
    const filterValue = 'completed';
    component.onFilterChange(filterValue);
    expect(todoListServiceMock.setFilterStatus).toHaveBeenCalledWith(
      filterValue
    );
  });
});
