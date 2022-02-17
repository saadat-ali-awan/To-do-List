import Task from './task.js';

export default class TodoList {
  constructor() {
    this.list = [];
  }

  addTask(completed, description) {
    this.list.add(Task(this.list.length, completed, description));
  }
}