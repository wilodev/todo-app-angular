import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, combineLatest } from 'rxjs';
import { TodoItem } from '../models/todo-item.model';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private todosSource = new BehaviorSubject<TodoItem[]>([]);
  private filterStatus = new BehaviorSubject<string>('all');
  todos$ = this.todosSource.asObservable();

  filteredTodos$: Observable<TodoItem[]> = combineLatest([
    this.todos$,
    this.filterStatus,
  ]).pipe(
    map(([todos, filter]) => {
      if (filter === 'all') {
        return todos;
      }
      const isCompleted = filter === 'completed';
      return todos.filter((todo) => todo.isCompleted === isCompleted);
    })
  );

  constructor(private apiService: ApiService) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.apiService
      .getItems<TodoItem>('todos')
      .subscribe((todos) => this.todosSource.next(todos));
  }

  get itemCount(): Observable<number> {
    return this.todos$.pipe(map((todos: TodoItem[]) => todos.length));
  }

  get pendingCount(): Observable<number> {
    return this.todos$.pipe(
      map(
        (todos: TodoItem[]) =>
          todos.filter((todo: TodoItem) => !todo.isCompleted).length
      )
    );
  }
  setFilterStatus(status: string) {
    this.filterStatus.next(status);
  }

  addTodo(todo: TodoItem) {
    this.apiService.addItem<TodoItem>('todos', todo).subscribe((newTodo) => {
      const currentTodos = this.todosSource.value;
      this.todosSource.next([...currentTodos, newTodo]);
    });
  }

  updateTodoItem(todo: TodoItem) {
    this.apiService
      .updateItem<TodoItem>('todos', todo)
      .subscribe((updatedTodo) => {
        const currentTodos = this.todosSource.value;
        const todoIndex = currentTodos.findIndex(
          (t) => t.id === updatedTodo.id
        );
        if (todoIndex !== -1) {
          currentTodos[todoIndex] = updatedTodo;
          this.todosSource.next([...currentTodos]);
        }
      });
  }

  onDelete(id: number) {
    this.apiService.deleteItem<TodoItem>('todos', id).subscribe(() => {
      const updatedTodos = this.todosSource.value.filter(
        (todo) => todo.id !== id
      );
      this.todosSource.next(updatedTodos);
    });
  }

  onToggleComplete(todo: TodoItem) {
    this.apiService
      .updateItem<TodoItem>('todos', todo)
      .subscribe((updatedTodo) => {
        let todos = this.todosSource.value;
        const index = todos.findIndex((t) => t.id === updatedTodo.id);
        if (index !== -1) {
          todos[index] = updatedTodo;
          this.todosSource.next([...todos]);
        }
      });
  }
}
