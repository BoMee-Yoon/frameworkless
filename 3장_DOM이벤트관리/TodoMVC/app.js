import getTodos from './getTodos.js';
import todosView from './views/todos.js';
import counterView from './views/counter.js';
import filtersView from './views/filters.js';
import appView from './views/app.js';

import registry from './registry.js';

import applyDiff from './views/applyDiff.js';

registry.add('app', appView);
registry.add('todos', todosView);
registry.add('counter', counterView);
registry.add('filters', filtersView);

const state = {
  todos: getTodos(),
  currentFilter: 'All'
}



const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root');
    const newMain = registry.renderRoot(main, state);
    applyDiff(document.body, main, newMain);
  });
}

// window.setInterval(() => {
//   state.todos = getTodos();
//   render()
// }, 5000);

render();

/*
렌더링 엔진은 requestAnimationFrame을 기반으로 한다.
모든 DOM 조작이나 애니메이션은 이 DOM API를 기반으로 해야한다.
이 콜백 내에서 DOM 작업을 수행하면 더 효율적이 된다.
이 API는 메인 스레드를 차단하지 않으며 다음 다시 그리기(repaint)가 이벤트 루프에서 스케줄링되기 직전에 실행된다.
브라우저렌더링 => 다음 렌더링 대기 => 새 가상 노드 => DOM 조작 => 브라우저 렌더링
<-- requestAnimationFrame -->    <--- replaceMode -->
*/