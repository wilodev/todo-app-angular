import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodoItemComponent } from '../../../todo-list/components/todo-item/todo-item.component';
import { TodoFormComponent } from '../../../todo-form/components/todo-form/todo-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TodoListService } from '../../../todo-list/service/todo-list.service';
import { TodoItem } from '../../../todo-list/models/todo-item.model';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [
    CommonModule,
    TodoItemComponent,
    TodoFormComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
})
export class TodoPageComponent {
  itemCount$ = this.todoListService.itemCount;
  pendingCount$ = this.todoListService.pendingCount;
  filteredTodos$ = this.todoListService.filteredTodos$;

  constructor(private todoListService: TodoListService) {}

  addTodo(newTodo: TodoItem) {
    this.todoListService.addTodo(newTodo);
  }

  onDelete(id: number) {
    this.todoListService.onDelete(id);
  }

  onToggleComplete(todo: TodoItem) {
    this.todoListService.onToggleComplete(todo);
  }
  trackById(index: number, item: TodoItem): number {
    return item.id;
  }
  onFilterChange(filterValue: string) {
    this.todoListService.setFilterStatus(filterValue);
  }

  onItemUpdate(item: TodoItem) {
    this.todoListService.updateTodoItem(item);
  }
}
