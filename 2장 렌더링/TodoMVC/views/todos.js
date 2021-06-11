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

export default (targetElement, { todos }) => {
  const newList = targetElement.cloneNode(true);
  const todosElements = todos.map(getTodoElement).join('');
  newList.innerHTML = todosElements;
  return newList;
}