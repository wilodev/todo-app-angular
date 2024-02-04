import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from '../../models/todo-item.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() item!: TodoItem;
  @Output() delete = new EventEmitter<number>();
  @Output() toggleComplete = new EventEmitter<TodoItem>();
  @Output() update = new EventEmitter<TodoItem>();

  isEditing = false;
  editTitle = '';

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editTitle = this.item.title;
    } else {
      if (this.editTitle !== this.item.title) {
        this.item.title = this.editTitle;
        this.update.emit(this.item);
      }
    }
  }

  onDelete() {
    this.delete.emit(this.item.id);
  }

  onToggleComplete() {
    this.toggleComplete.emit({
      ...this.item,
      isCompleted: !this.item.isCompleted,
    });
  }
}
