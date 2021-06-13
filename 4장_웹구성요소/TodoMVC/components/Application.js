import { EVENTS } from './List.js';

export default class App extends HTMLElement {
  // 속성이 없는 대신 내부 상태를 가짐
  constructor() {
    super();
  
    this.state = {
      todos: [],
      filter: 'All'
    }

    this.template = document.querySelector('#todo-app');
  }

  deleteItem(idx) {
    this.state.todos.splice(idx, 1);
    this.syncAttributes();
  }

  addItem(text) {
    this.state.todos.push({
      text,
      completed: false,
    });

    this.syncAttributes();
  }

  syncAttributes() {
    // 이벤트 (deleteItem, addItem)는 상태를 변경한 다음 컴포넌트가 syncAttributes 메서드에서
    // 해당 상태를 하위 속성과 동기화 한다
    this.list.todos = this.state.todos;
    this.footer.todos = this.state.todos;
    this.footer.filter = this.state.filter;
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      const content = this.template.content.firstElementChild.cloneNode(true);
      this.appendChild(content);

      this
        .querySelector('.new-todo')
        .addEventListener('keypress', ({ key, target }) => {
          if (key === 'Enter') {
            this.addItem(target.value);
            target.value = '';
          }
        });

      this.footer = this.querySelector('todomvc-footer');
      this.list = this.querySelector('todomvc-list');

      this.list.addEventListener(
        EVENTS.DELETE_ITEM,
        ({ detail }) => this.deleteItem(detail.index)
      );

      this.syncAttributes();
    })
  }
}