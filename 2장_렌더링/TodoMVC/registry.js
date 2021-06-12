const registry = {
  // todos: 'todosView',
  // counter: 'counterView',
  // filters: 'filtersView'
}

// 순수 함수로 작성하고 있기 때문에 기본 객체에서 상속받을 수 없다.
// 따라서 구성 요소를 래핑하는 고차함수를 생성해야 한다.
const renderWrapper = component => {
  
  return (targetElement, state) => {
    const element = component(targetElement, state);

    const childComponents = element.querySelectorAll('[data-component]');

    Array.from(childComponents)
      .forEach(target => {
        const name = target.dataset.component;

        const child = registry[name];
        if (!child) return;

        target.replaceWith(child(target,state));
      });

    return element;
  }
}

// 레지스트리 접근자(accessor) 메서드
const add = (name, component) => {
  registry[name] = renderWrapper(component);
}


// 최초 DOM 요소에 렌더링을 시작하기 위해 애플리케이션의 루트를 렌더링하는 메서드를 제공

const renderRoot = (root, state) => {
  const cloneComponent = root => {
    return root.cloneNode(true);
  }
  return renderWrapper(cloneComponent)(root, state);
}

// add 와 renderRoot 메서드는 구성 요소 레지스트리의 공용 인터페이스이다.

export default {
  add,
  renderRoot,
}