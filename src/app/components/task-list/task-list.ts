import { Component, signal } from '@angular/core';
import { TaskService } from '../../services/task';
import { DatePipe } from '@angular/common';
import { Task } from '../../models/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [DatePipe, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  constructor(public taskService: TaskService) { }

  editingTaskId = signal<number | null>(null);
  editTitle = signal('');
  editPriority = signal<'low' | 'medium' | 'high'>('medium');

  startEdit(task: Task) {
    this.editingTaskId.set(task.id);
    this.editTitle.set(task.title);
    this.editPriority.set(task.priority);
  }

  saveEdit(taskId: number) {
    this.taskService.updateTask(
      taskId,
      this.editTitle(),
      this.editPriority()
    );

    this.editingTaskId.set(null);
  }

  cancelEdit() {
    this.editingTaskId.set(null);
  }
}
