import DOMManipulation from './js/dom_manipulation.js';
import Events from './js/events.js';
import TodoList from './js/todo_list.js';
import './stylesheet/main.css';

window.addEventListener('load', () => {
  Events.init();
  DOMManipulation.init();
  TodoList.init();
  TodoList.list.forEach((task) => {
    DOMManipulation.addTask(task);
  });
});