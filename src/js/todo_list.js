import Task from './task.js';

export default class TodoList {
  static list = [];

  static init() {
    this.loadDataFromStorage();
  }

  static addTask(completed, description) {
    const newTask = new Task(this.list.length, completed, description);
    this.list.push(newTask);
    this.addToStorage();
    return newTask;
  }

  static addToStorage() {
    localStorage.setItem('taskList', JSON.stringify(this.list));
  }

  static loadDataFromStorage() {
    const data = JSON.parse(localStorage.getItem('taskList'));
    if (data && data !== '') {
      this.list = data.map((value) => new Task(value.index, value.completed, value.description));
    }
  }

  static deleteTask(id, listElem) {
    let newIndex = 0;
    this.list = this.list.filter((value) => {
      if (value.index === id) {
        listElem.querySelector(`#item${value.index}`).remove();
        return false;
      }
      const oldElem = listElem.querySelector(`#item${value.index}`);
      value.index = newIndex;
      oldElem.id = `item${newIndex}`;
      newIndex += 1;
      return true;
    });

    this.addToStorage();
  }

  static clearCompletedTask(listElem) {
    let newIndex = 0;
    this.list = this.list.filter((value) => {
      if (value.completed === true) {
        listElem.querySelector(`#item${value.index}`).remove();
        return false;
      }
      const oldElem = listElem.querySelector(`#item${value.index}`);
      value.index = newIndex;
      oldElem.id = `item${newIndex}`;
      newIndex += 1;
      return true;
    });

    this.addToStorage();
  }
}