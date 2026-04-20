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

  constructor() {
    this.tasks.set([
      {
        id: 1,
        title: 'Learn Angular signals',
        completed: false,
        priority: 'high',
        createdAt: new Date()
      },
      {
        id: 2,
        title: 'Build task manager',
        completed: true,
        priority: 'medium',
        createdAt: new Date()
      }
    ]);
  }

  addTask(title: string, priority: 'low' | 'medium' | 'high') {
    const currentTasks = this.tasks();

    const nextId =
      currentTasks.length > 0
        ? Math.max(...currentTasks.map(t => t.id)) + 1
        : 1;

    const newTask: Task = {
      id: nextId,
      title,
      completed: false,
      priority,
      createdAt: new Date()
    };

    this.tasks.update(tasks => [...tasks, newTask]);
  }

  toggleTask(id: number) {
    this.tasks.update(tasks =>
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  deleteTask(id: number) {
    this.tasks.update(tasks => tasks.filter(t => t.id !== id));
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter.set(filter);
  }

  updateTask(
    id: number,
    title: string,
    priority: 'low' | 'medium' | 'high'
  ) {
    this.tasks.update(tasks =>
      tasks.map(t =>
        t.id === id
          ? { ...t, title, priority }
          : t
      )
    );
  }
}