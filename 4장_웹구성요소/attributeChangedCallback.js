import applyDiff from "../3장_DOM이벤트관리/TodoMVC/views/applyDiff.js";

const DEFAULT_COLOR = 'purple';

const createDomElement = color => {
  const div = document.createElement('div');
  div.textContent = 'Hello new div';
  div.style.color = color;
  return div
}

export default class HelloWorld extends HTMLElement {
  static get observedAttributes() {
    return ['color']
  }

  get color() {
    return this.getAttribute('color') || DEFAULT_COLOR;
  }

  set color(value) {
    this.setAttribute('color', value)
  }

  // 모든 속성이 attributeChangedCallback을 트리거하지는 않으며
  // observedAttributes 배열에 나열된 속성만 트리거 한다
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.hasChildNodes()) return;

    applyDiff(
      this,
      this.firstElementChild,
      createDomElement(newValue)
    )
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      this.appendChild(createDomElement(this.color))
    })
  }
}