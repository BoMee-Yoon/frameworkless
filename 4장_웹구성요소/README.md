# 웹 구성 요소

---

## API

- 웹 구성 요소는 세가지 중요 기술로 구성 -> 개발자가 재사용할 수 있는 UI 구성 요소를 작성하고 제시할 수 있게 해준다

---

- _HTML 템플릿_: `<template>` 태그는 콘텐츠가 렌더링되지는 않지만 자바스크립트 코드에서 동적인 콘텐츠를 생성하는데 '스템프'로 사용되도록 하려는 경우 유용
- _사용자 정의 요소_: 이 API를 통해 개발자는 완전한 기능을 갖춘 자신만의 DOM 요소를 작성할 수 있다
- _Shadow DOM_: 이 기술은 웹 구성 요소가 구성 요소 외부의 DOM에 영향을 받지 않아야 하는 경우 유용하다. 다른 사람들과 공유할 수 있도록 구성 요소 라이브러리나 위젯을 작성하려는 경우 매우 유용하다.

### 사용자 정의 요소

- 사용자 정의 요소 API는 웹 구성 요소의 핵심 요소이다.
  `<app-calendar/>` -> 사용자 정의 요소 API를 사용해 사용자 정의 태그를 작성할 때는 대시로 구분된 두 단어 이상의 태그를 사용해야 한다.

  ```ts
  export default class HelloWorld extends HTMLElement {
    connectedCallback() {
      window.requestAnimationFrame(() => {
        this.innerHTML = '<div>Hello Bommmmmm</div>';
      });
    }
  }
  ```

  - `connectedCallback`은 사용자 정의 요소의 라이프사이클 메서드 중 하나다. 이 때 메서드는 구성 요소가 DOM에 연결될 때 호출된다. 리액트의 `componentDidMount`메서드와 매우 유사하다. 콘텐츠를 렌더링하거나 타이머를 시작하거나 또는 네트워크에서 데이터를 가져오기에 좋다.
  - `disconnectedCallback`은 정리 작업에 유용하다
  - 새로 생성된 `HelloWorld` 를 사용하려면 브라우저 구성 요소 레지스트리에 추가해야 한다
  - `window.customElents` 속성의 `define` 메서드를 사용해서 추가할 수 있다

  ```ts
  import HelloWord from './components/HelloWorld.js';
  window.customElements.define('hello-world', HelloWorld);
  ```

  - 브라우저 구성 요소 레지스트리에 구성 요소를 추가하는 것은 태그 이름(예제의 경우 'hello-word')을 사용자 정의 요소 클래스에 연결하는 것을 의미한다. 그런다음에 생성한 사용자 정의 태그(`<hello-word/>`)를 구성 요소로 사용할 수 있다.

  ### 속성 관리

  - 어떤 프레임워크와도 호환되는 새로운 구성 요소를 만들 수 있어야 한다
  - 이 목적을 달성하려면 구성 요소에 다른 표준 `HTML` 요소와 동일한 공용 `API`가 있어야 한다. 따라서 사용자 정의 요소에 속성을 추가하려면 다른 속성과 동일한 방식으로 이 속성을 관리할 수 있어야 한다.

  ```ts
  // 속성을 가진 HelloWorld
  const DEFAULT_COLOR = 'red';

  export default class HellowWorld extends HTMLElement {
    get color() {
      return this.getAttribute('color') || DEFAULT_COLOR;
    }

    set color(value) {
      this.setAttribute('color', value);
    }

    connectedCallback() {
      window.requestAnimationFrame(() => {
        const div = document.createElement('div');
        div.textContent = 'hi bom';
        div.style.color = this.color;

        this.appendChild(div);
      });
    }
  }
  ```

  - 색상 getter/setter 는 `getAttribute/setAttribute`에 대한 래퍼일뿐이다

  ```html
  <hello-world></hello-world>
  <hello-world color="yellow"></hello-world>
  <hello-world color="green"></hello-world>
  ```

  - CDN의 구성 요소 코드만 공개하면 특별한 지침 없이 모든 사람이 사용 가능

  ### `attributeChangedCallback`

  ```ts
  const changeColorTo = (color) => {
    document
      .querySelectorAll('hello-world')
      .forEach((helloWorld) => (helloWorld.color = color));
  };

  document
    .querySelector('button')
    .addEventListener('click', () => changeColorTo('blue'));
  ```

  - 버튼을 클릭하면 핸들러는 모든 `HelloWorld` 구성 요소의 `color` 속성을 파란색으로 변경하지만, 화면에는 아무 일도 일어나지 않는다. 이 문제를 위해 아래와 같이 해결하면 세터 자체에 일종의 DOM 조작을 추가하는 것이므로 비추

  ```ts
    set color(value) {
      this.setAttribute('color', value);
      // 새로운 색상으로 DOM을 업데이트
    }
  ```

  - `color` 세터 대신 `setAttribute` 메서드를 사용하면 `DOM`도 업데이트되지 않았기 때문에 매우 취약한 방법이다
  - 올바른 방법은 구성 요소의 라이프사이클 동안 속성이 변경되도록 `attributeChangedCallback`메서드를 사용하는 것이다
  - `attributeChangedCallback` 메서드는 속성이 변경될 때마다 호출된다

[참고]

- [custom-elements](https://ko.javascript.info/custom-elements)
