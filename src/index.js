import './stylesheet/main.css';
import threeDots from './images/three-dots.png';

const todoList = [
  {
    index: 0,
    completed: false,
    description: 'Write Code',
  },
  {
    index: 1,
    completed: true,
    description: 'Drink coffee and hear lecture',
  },
  {
    index: 2,
    completed: false,
    description: 'Play Games',
  },
];

window.addEventListener('load', () => {
  const listElem = document.querySelector('#list');
  todoList.forEach((task) => {
    listElem.innerHTML += `<li>
    <input type="checkbox" name='completed' value='${task.completed ? 'completed' : 'not-completed'}' ${task.completed ? 'checked' : ''}>
    <span>${task.description}</span>
    <img src=${threeDots} alt="Three Dots Button">
    </li>`;
  });
});