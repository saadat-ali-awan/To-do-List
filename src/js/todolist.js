import Task from './task.js';

export default class TodoList {
  constructor() {
    this.list = [];
  }

  init() {
    this.list = localStorage.getItem('list');
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

  editTaskDescription(index, description) {
    this.list[index].description = description;
    this.saveToLocalStorage();
  }

  sortTasks() {
    this.list.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      }
      if (a.index < b.index) {
        return -1;
      }
      return 0;
    });
  }

  saveToLocalStorage() {
    localStorage.setItem('list', this.list);
  }
}