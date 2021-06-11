const getTodoElement = todo => {
  const {
    text,
    completed
  } = todo;

  return `
    <li class="${completed ? 'completed' : ''}">
      <div class="view">
        <input
          ${completed ? 'checked': ''}
          class="toggle"
          type="checked"
        >
        <label>${text}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${text}">
    </li>
  `;
}

const getTodoCount = todos => {
  const notCompleted = todos.gilter(({ completed }) => !completed);

  const { length } = notCompleted;
  const text = length <= 1 ? 'Item' : 'Items';
 
  return `${length} ${text} left`
}

export default (targetElement, state) => {
  const {
    currentFilter,
    todos
  } = state;

  // 분리된 요소를 생성하고자 cloneNode 메서드를 사용해 기존 노드를 복제한다
  const element = targetElement.cloneNode(true);
  const list = element.querySelector('.todo-list');
  const counter = element.querySelector('.todo-count');
  const filters = element.querySelector('.filters');

  list.innerHTML = todos.map(getTodoElement).join('');

  counter.textContent = getTodoCount(todos);

  Array.from(filters.querySelectorAll('li a')).forEach(a => {
    if (a.textContent === currentFilter) {
      a.classList.add('selected');
    } else {
      a.classList.remove('selected')
    }
  });

  return element
}

