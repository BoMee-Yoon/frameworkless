// HTTP 클라이언트를 직접 사용하지 않도록 요청을 todos 모델 객체에 래핑 (캡슐화)

import http from './http.js';

const HEADERS = {
  'Content-Type': 'application/json'
}

const BASE_URL = '/api/todos';

const list = () => http.get(BASE_URL);

const create = text => {
  const todo = {
    text,
    complated: false,
  }

  return http.post(
    BASE_URL,
    todo,
    HEADERS
  )
}

const update = newTodo => {
  const url = `${BASE_URL}/${newTodo.id}`;
  return http.patch(
    url,
    newTodo,
    HEADERS
  )
}

const deleteTodo = id => {
  const url = `${BASE_URL}/${id}`;
  return http.delete(
    url,
    HEADERS
  )
}

export default {
  list,
  create,
  update,
  delete: deleteTodo
}