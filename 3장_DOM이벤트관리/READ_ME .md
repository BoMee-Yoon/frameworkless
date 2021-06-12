# DOM 이벤트 관리

## YAGNI 원칙: You aren't gonna need it

### 정말 필요하다고 간주할 때까지 기능을 추가하지 마라

- 가장 중요한 기능에 초점 맞춰 개발하기
- 새로운 요구가 생기면 이에 따라 아키텍처를 지속적으로 발전 시키기

## DOM 이벤트 API

- 마우스 이벤트, 키보드 이벤트, 뷰 이벤트를 포함한 사용자가 트리거한 이벤트에 반응할 수 있다
- 이벤트에 반응하려면 이벤트를 트리거한 DOM 요소(이벤트 핸들러로 불리는 콜백)에 연결해야 한다
- 뷰나 시스템 이벤트의 경우 이벤트 핸들러를 window 객체에 연결해야 한다

### 속성에 핸들러 연결

- 속성을 사용하면 한번에 하나의 핸들러만 연결할 수 있다
- addEventListener 메서드 사용 권장

### `addEventListener` 로 핸들러 연결

- 이벤트를 처리하는 모든 DOM 노드에 EventTarget 인터페이스를 구현한다. 이 인터페이스의 `addEventListener` 메서드는 이벤트 핸들러를 DOM 노드에 추가한다
- DOM에 요소가 더 이상 존재하지 않으면 메모리 누수를 방지하고자 이벤트 리스너도 삭제해야 한다. 이를 위해 `removeEventListener` 메서드를 사용한다

## 이벤트 객체

- 웹 애플리케이션에 전달된 모든 이벤트에는 Event 인터페이스를 구현한다.

## DOM 이벤트 라이프 사이클

- `addEventListener('click', handler, false)`: 세 번째 매개변수는 useCapture 라고 불리며 기본값은 false 다
- 폭넓은 브라우저 호환성을 얻으려면 포함해야 함
- 이벤트를 캡처한다? `useCapture = true` 란?

  ```html
  <body>
    <div>
      This is a container
      <button>Click Here</button>
    </div>
  </body>
  ```

  ```ts
  const button = $('button');
  const div = $('div');

  div.addEventListener(
    'click',
    () => {
      console.log('div');
    },
    false
  );

  button.addEventListener(
    'click',
    () => {
      console.log('button');
    },
    false
  );
  ```

  - 여기서 버튼을 클릭하면 `button` 이 `div` 안에 있으므로 `button`부터 시작해 두 핸들러가 모두 호출된다.
  - 따라서 이벤트 객체는 이를 트리거한 DOM 노드(예제의 경우 `button`)에서 시작해 모든 조상 노드로 올라간다.
  - 이 메커니즘을 버블 단계(`bubble phase`)나 이벤트 버블링(`event bubbling`)이라고 한다.
  - `Event` 인테페이스의 `stopPropagation` 메서드를 사용해 버블 체인을 중지할 수 있다.

  ```ts
  div.addEventListener(
    'click',
    () => {
      console.log('div clicked');
    },
    false
  );

  button.addEventListener(
    'click',
    (e) => {
      e.stopPropagation();
      console.log('Button clicked');
    },
    false
  );
  ```

  - div 핸들러는 호출되지 않는다
  - 복잡한 레이아웃에서 유용할 수 있지만, 핸들러의 순서에 의존하는 경우 코드 유지가 어렵기 때문에 이벤트 위임(`event delegation`) 패턴이 유용한다
  - `useCapture`매개변수를 사용해 핸들러의 실행 순서를 반대로 할 수 있다.

  ```ts
  div.addEventListener(
    'click',
    () => {
      console.log('div clicked');
    },
    true
  );

  button.addEventListener(
    'click',
    (e) => {
      e.stopPropagation();
      console.log('Button clicked');
    },
    true
  );
  ```

  - `useCapture` 매개변수에 `true`를 사용하면 버블단계 대신 캡쳐 단계에 이벤트 핸들러를 추가한다는 의미다
  - 버블 단계에서는 핸들러가 상향식(buttom-up)으로 처리되는 반면 캡쳐 단계에서는 반대로 처리된다
  - `html` 태그에서 핸들러 관리를 시작하고 이벤트 트리거한 요소를 만날 때까지 내려간다
  - 생성된 모든 DOM 이벤트에 대해 브라우저는 캡처 단계(하향식 - `top-down`)를 실행한 다음 버블 단계(상향식)를 실행한다는 것을 명심하자.
  - 목표단계(target phase)라고 하는 세 번째 단계도 있다
  - 이 특별한 단계는 이벤트가 목표요소(예제의 경우 `button`)에 도달할 때 발생한다.

  ```
    1. 캡처 단계: 이벤트가 html에서 목표 요소로 이동
    2. 목표 단계: 이벤트가 목표 요소에 도달
    3. 버블 단계: 이벤트가 목표 요소에서 html 로 이동
  ```

## 사용자 정의 이벤트 사용

- DOM 이벤트 API에서는 사용자 정의 이벤트 타입을 정의하고 다른 이벤트처럼 처리할 수 있다
- 도메인에 바인딩되고 시스템 자체에서만 발생한 DOM 이벤트를 생성할 수 있기 때문에 DOM 이벤트 API에서 정말 중요한 부분이다
- 로그인이나 로그아웃, 또는 리스트에 새 레코드를 생성하는 것과 같이 데이터 집합에 발생한 이벤트에 대한 이벤트 핸들러를 생성할 수 있다
- 사용자 정의 이벤트를 생성하려면 `CustomEvent` 생성자 함수를 사용한다

# TodoMVC에 이벤트 추가

- 항목 삭제: 행의 오른쪽에 있는 십자가를 클릭한다
- 항목의 완료 여부 토글: 행의 왼쪽에 있는 원을 클릭한다
- 필터 변경: 하단의 필터 이름을 클릭하다
- 항목 생성: 상단 입력 텍스트에 값을 입력하고 키보드의 Enter를 누른다
- 완성된 모든 항목 삭제: 'Clear completed' 레이블을 클릭한다
- 모든 항목의 완료 여부 토글: 왼쪽 상단 모서리에 있는 V자 표시를 클릭한다
- 항목 편집: 행을 더블 클릭하고 값을 변경한 후 키보드에서 Enter를 누른다

(참고)

- [UML 이란](https://m.blog.naver.com/icbanq/221781238065)
- [UML 클래스 다이어그램](https://gmlwjd9405.github.io/2018/07/04/class-diagram.html)
- [html template](https://kyu.io/%EC%9B%B9-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B84%E2%80%8A-%E2%80%8Atemplate-element-html-imports/)

# 기본 이벤트 처리 아키텍처

- 렌더링 엔진은 상태를 가져오고 DOM 트리를 생성하는 순수 함수를 기반으로 한다
- 새로운 상태마다 새로운 DOM 트리를 생성해 가상 DOM 알고리즘을 적용할 수 있다
- 이 시나리오에서는 '루프'에 이벤트 핸들러를 쉽게 삽입할 수 있다 (루프는 렌더링과 새로운 상태 사이에 이벤트)
- 모든 이벤트 다음에 상태를 조작한 후 새로운 상태로 메인 랜더링 함수를 호출한다
  - 간단한 유스케이스의 단계를 열거함으로써 상태-렌더링-이벤트 루프 테스트 하기
    (사용자가 리스트에서 항목을 추가하고 삭제하는 것을 가정)
    - _초기 상태_: 비어있는 todo 리스트
    - _렌더링_: 사용자에게 비어있는 리스트 표시
    - _이벤트_: 사용자가 '더미 항목'이라는 새항목을 생성
    - _새로운 상태_: 하나의 항목을 가진 todo 리스트
    - _렌더링_: 사용자에게 하나의 항목을 가진 리스트 표시
    - _이벤트_: 사용자가 항목을 삭제
    - _새로운 상태_: 비어있는 todo 리스트
    - _랜더링_: 사용자에게 비어있는 리스트 표시
