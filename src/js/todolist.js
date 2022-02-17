import Task from './task.js';

export default class TodoList {
  constructor() {
    this.list = [];
  }

  addTask(completed, description) {
    this.list.add(Task(this.list.length, completed, description));
  }

  deleteTask(index) {
    this.sortTasks();
    let newIndex = 0;
    const newList = [];
    this.list.forEach((task) => {
      if (index !== task.index) {
        newList.add(Task(newIndex, task.completed, task.description));
        newIndex += 1;
      }
    });
    this.list = newList;
    this.saveToLocalStorage();
  }
}