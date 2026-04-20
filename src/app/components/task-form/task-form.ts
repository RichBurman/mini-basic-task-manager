import { Component } from '@angular/core';
import { TaskService } from '../../services/task';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
    title = '';

  constructor(private taskService: TaskService) {}

  addTask() {
    if (!this.title.trim()) return;

    this.taskService.addTask(this.title);
    this.title = '';
  }
}
