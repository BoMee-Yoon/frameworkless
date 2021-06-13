const getTodoCount = todos => {
  const notCompleted = todos.filter(({ completed }) => !completed);

  const { length } = notCompleted;

  const text = length <= 1 ? 'Item' : 'Items'
  
  return `${length} ${text} left`;
}

export default class Footer extends HTMLElement {
  static get observedAttributes() {
    return ['filter', 'todos'];
  }

  get todos() {
    if (!this.hasAttribute('todos')) return [];
    return JSON.parse(this.getAttribute('todos'));
  }

  set todos(value) {
    this.setAttribute('todos', JSON.stringify(value))
  }

  get filter() {
    return this.getAttribute('filter');
  }

  set filter(value) {
    this.setAttribute('filter', value);
  }

  connectedCallback() {
    console.log(this, 'this가 뭘까 footer');
    const template = document.querySelector('#footer');
    const content = template.content.firstElementChild.cloneNode(true);

    this.appendChild(content);
  
    const {
      filter,
      todos
    } = this;

    this.querySelectorAll('li a').forEach(a => {
      if (a.textContent === filter) {
        a.classList.add('selected');
      } else {
        a.classList.remove('selected')
      }
    });

    const label = getTodoCount(todos);

    this.querySelector('span.todo-count').textContent = label;
  }
}