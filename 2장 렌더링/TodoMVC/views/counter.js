const getTodoCount = todos => {
  const notCompleted = todos.filter(({ completed }) => !completed);
  
  const { length } = notCompleted;
  const text = length <= 1 ? 'Item' : 'Items';

  return `${length} ${text} left`;
}

export default (targetElement, { todos }) => {
  const newCounter = targetElement.cloneNode(true);
  
  newCounter.textContent = getTodoCount(todos);
  
  return newCounter;
}