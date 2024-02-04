import { TodoListService } from './todo-list.service';
import { ApiService } from '../../../core/services/api.service';
import { of } from 'rxjs';

const apiServiceMock = {
  getItems: jest.fn().mockReturnValue(of([])),
  addItem: jest.fn().mockReturnValue(of({})),
  deleteItem: jest.fn().mockReturnValue(of({})),
  updateItem: jest.fn().mockReturnValue(of({})),
};

describe('TodoListService', () => {
  let service: TodoListService;

  beforeEach(() => {
    service = new TodoListService(apiServiceMock as unknown as ApiService);
  });

  it('should load initial data', (done) => {
    const testTodos = [{ id: 1, title: 'Test Todo', isCompleted: false }];
    apiServiceMock.getItems.mockReturnValue(of(testTodos));

    service.loadInitialData();

    service.todos$.subscribe((todos) => {
      expect(todos).toEqual(testTodos);
      expect(apiServiceMock.getItems).toHaveBeenCalledWith('todos');
      done();
    });
  });

  it('should add a todo item', (done) => {
    const testTodo = { id: 2, title: 'New Todo', isCompleted: false };
    apiServiceMock.addItem.mockReturnValue(of(testTodo));

    service.addTodo(testTodo);

    service.todos$.subscribe((todos) => {
      expect(todos).toContain(testTodo);
      expect(apiServiceMock.addItem).toHaveBeenCalledWith('todos', testTodo);
      done();
    });
  });
});
