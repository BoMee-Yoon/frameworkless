- DOM 이 HTML 요소로 정의된 트리를 관리하는 방법

```ts
const SELECTOR = 'tr:nth-child(3) > td';
const cell = document.querySelector(SELECTOR);
cell.style.backgroundColor = 'red';
```

- querySelector 메서드는 Node 메서드임
- Node 는 HTML 트리에서 노드를 나타내는 기본 인터페이스임

# 렌더링 성능 모니터링

- 렌더링 엔진을 설계할 때 가독성(readability)과 유지 관리성(maintainability)가 중요
- 렌더링 엔진에서 중요한 요소는 성능
- 사용자 정의 성능 위젯

  - `requestAnimationFrame` 콜백을 사용해 현재 렌더링 사이클과 다음 사이클 사이의 시간을 추적하고 콜백이 1초 내에 호출되는 횟수를 추적 (renderingTimer.js)

  # 렌더링 함수

  - 함수를 사용해 요소를 DOM에 렌더링하는 방법 -> DOM 요소가 애플리케이션의 상태에만 의존하는 것을 의미한다
    `view = f(state)`
