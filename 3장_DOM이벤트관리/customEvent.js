// 사용자 정의 이벤트를 처리하려면 일반적으로 `addEventListener` 메서드로 표준 이벤트 리스너를 추가한다
// 또한 생성자(예제의 경우 `timestamp`)에서 사용한 detail 객체를 사용해 추가 데이터를 핸드러에 전달할 수 있다

const EVENT_NAME = 'FiveCharInputValue';
const input = $('input');

input.addEventListener('input', () => {
  const { length } = input.value;
  console.log('input length', length);

  if (length === 5) {
    const time = (new Date()).getTime();
    const event = new CustomEvent(EVENT_NAME, {
      detail: {
        time
      }
    })
    input.dispatchEvent(event);
  }
})

input.addEventListener(EVENT_NAME, e => {
  console.log('handling custom event...', e.detail);
})