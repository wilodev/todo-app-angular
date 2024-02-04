import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TodoItem } from '../../../todo-list/models/todo-item.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent {
  newItem: TodoItem = { id: Date.now(), title: '', isCompleted: false }; // Use a suitable model for your TodoItem
  @Output() newTodo = new EventEmitter<TodoItem>();

  onSubmit() {
    if (!this.newItem.title.trim()) return; // Don't emit if title is empty
    this.newTodo.emit(this.newItem);
    this.newItem = { id: Date.now(), title: '', isCompleted: false }; // Reset the form and use a timestamp based id
  }
}
