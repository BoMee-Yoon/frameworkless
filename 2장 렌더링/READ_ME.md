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
  - registry: component 라이브러리를 생성하기 위한 또 다른 필수 조건
    - 레지스트리는 애플리케이션에서 사용할 수 있는 모든 구성 요소의 인덱스임
  - registry 키는 data-component 속성 값과 일치
    - 구성요소 기반 렌더링 엔진의 핵심 매커니즘
    - 루트 컨테이너(애플리케이션 뷰 함수)뿐만 아니라 생성할 모든 구성 요소에도 적용되어야 함
    - 이렇게 하면 모든 구성 요소가 다른 구성요소 안에서도 사용될 수 있음
    - 이런 재사용성(reusability)은 구성 요소 기반 애플리케이션에서 필수임
    - 모든 구성 요소가 data-component 속성의 값을 읽고 올바른 함수를 자동으로 호출하는 기본 구성 요소에 상속돼야 함
    - 구성 요소를 래핑하는 고차함수를 생성해야 함
