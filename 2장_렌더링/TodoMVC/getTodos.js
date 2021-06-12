const list = [
  {
    text: '1번째',
    completed: false
  }
]  
export default (todoList) => {
  return todoList ? todoList : list;
}