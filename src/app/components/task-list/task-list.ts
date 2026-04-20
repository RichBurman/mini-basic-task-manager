import { Component } from '@angular/core';
import { TaskService } from '../../services/task';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [DatePipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  constructor(public taskService: TaskService) {}
}
