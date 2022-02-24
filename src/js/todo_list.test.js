/**
 * @jest-environment jsdom
 */
import DOMManipulation from './dom_manipulation.js';
import Task from './task.js';
import TodoList from './todo_list.js';

describe('TodoList Test', () => {
  TodoList.init();
  localStorage.clear();
  document.body.innerHTML = '<section class="main">'
  + '<header>'
  + '    <h1>Today\'s To Do</h1>'
  + '    <img src="./images/refresh.png" alt="Refresh Button">'
  + '  </header>'
  + '  <input type="text" placeholder="Add to your list...">'
  + '  <ul id="list">'
  + '  </ul>'
  + '  <a href="#complete" class="inactive">Clear all completed</a>'
  + '</section>';

  DOMManipulation.init();

  test('Add Task In List', () => {
    TodoList.addTask(false, 'Task 1');
    DOMManipulation.addTask(TodoList.list[0]);
    expect(TodoList.list.length).toBe(1);
    TodoList.addTask(false, 'Task 2');
    DOMManipulation.addTask(TodoList.list[1]);
    expect(TodoList.list.length).toBe(2);
    expect(TodoList.list[0].description).toBe('Task 1');
    const data = JSON.parse(localStorage.getItem('taskList'));
    const tempData = data.map((value) => new Task(value.index, value.completed, value.description));
    expect(tempData.length).toBe(TodoList.list.length);
    tempData.forEach((task, index) => {
      expect(task.description).toBe(TodoList.list[index].description);
      expect(task.completed).toBe(TodoList.list[index].completed);
      expect(task.index).toBe(TodoList.list[index].index);
    });
    expect(document.querySelector('#list').querySelectorAll('li').length).toBe(2);
  });

  test('Remove Task', () => {
    expect(TodoList.list[0].description).toBe('Task 1');
    expect(document.querySelector('#list').querySelectorAll('li').length).toBe(2);

    TodoList.deleteTask(0, DOMManipulation.listElem);
    expect(TodoList.list.length).toBe(1);
    const data = JSON.parse(localStorage.getItem('taskList'));
    const tempData = data.map((value) => new Task(value.index, value.completed, value.description));
    expect(tempData.length).toBe(TodoList.list.length);
    tempData.forEach((task, index) => {
      expect(task.description).toBe(TodoList.list[index].description);
      expect(task.completed).toBe(TodoList.list[index].completed);
      expect(task.index).toBe(TodoList.list[index].index);
    });

    expect(document.querySelector('#list').querySelectorAll('li').length).toBe(1);
    expect(TodoList.list[0].description).toBe('Task 2');
  });
});