import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = signal<Task[]>([]);

  filter = signal<'all' | 'active' | 'completed'>('all');

  filteredTasks = computed(() => {
    const tasks = this.tasks();
    const filter = this.filter();

    if (filter === 'active') return tasks.filter(t => !t.completed);
    if (filter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
  });

  addTask(title:string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      priority: 'medium',
      createdAt: new Date()
    };

    this.tasks.update(tasks => [...tasks, newTask]);
  }

  toggleTask(id: number) {
    this.tasks.update( tasks =>
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  deleteTask(id: number) {
    this.tasks.update( tasks => tasks.filter(t => t.id !== id));
  }

  setFilter(filter: 'all' | 'filter' | 'completed') {
    this.filter.set(filter);
  }
  
}
