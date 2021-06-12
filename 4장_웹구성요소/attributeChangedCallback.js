const DEFAULT_COLOR = 'black';

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
    if (!this.div) return;

    if (name === 'color') {
      this.div.style.color = newValue;
    }
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      this.div = document.createElement('div');
      this.div.textContent = 'Hello bomee';
      this.div.style.color = this.color;
      this.appendChild(this.div);
    })
  }
}