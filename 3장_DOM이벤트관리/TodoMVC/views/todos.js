let template;

const createNewTodoNode = () => {
  if (!template) {
    template = document.querySelector('#todo-item');
  }

  return template
    .content
    .firstElementChild
    .cloneNode(true);
}

const getTodoElement = (todo, index, events) => {
  const {
    text,
    completed
  } = todo;

  const element = createNewTodoNode();

  element.querySelector('input.edit').value = text;
  element.querySelector('label').textContent = text;

  if (completed) {
    element.classList.add('completed');
    element.querySelector('input.toggle').checked = true;
  }

  element
    .querySelector('button.destroy')
    .dataset
    .index = index;

  return element;
}

export default (targetElement, { todos }, events) => {
  const newTodoList = targetElement.cloneNode(true);

  newTodoList.innerHTML = '';

  todos
    .map((todo, index) => getTodoElement(todo, index, events))
    .forEach(element => newTodoList.appendChild(element));

  // 리스트 자체에 하나의 이벤트 핸들러만 연결
  newTodoList.addEventListener('click', e => {
    if (e.target.matches('button.destroy')) {
      deleteItem(e.target.dataset.index)
    }
  })
  
  return newTodoList;
}