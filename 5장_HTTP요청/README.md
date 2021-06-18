# HTTP 요청

- AJAX 애플리케이션의 핵심은 XMLHttpRequest 객체다
- AJAX 의 'X'는 'XML'을 나타낸다. AJAX가 등장했을 때 웹 애플리케이션은 서버 데이터를 XML 형식으로 수신했다
- 지금은 좀 더 친숙한 JSON(자바스크립트 애플리케이션용)형식이 사용된다
- 범용 고유 식별자(UUID, Universally Unique IDentifiers)

## REST

- REpresentational State Transfer 의 약자로 웹 서비스를 디자인하고 개발하는 방법이다
- 도메인을 리소스로 분할해야 하며 각 리소스는 특정 URI(Uniform Resource Identifier)로 접근해 읽거나 조작할 수 있어야 한다

## Fetch

- Fetch 는 원격 리소스에 접근하고자 만들어진 새로운 API 이다.
- 이 API의 목적은 Request 나 Response 같은 많은 네트워크 객체에 대한 표준 정의를 제공하는 것이다
- 이 방식으로 이 객체는 ServiceWorker와 Cache 같은 다른 API와 상호 운용할 수 있다
- 요청을 생성하려면 Fetch API로 작성된 HTTP 클라이언트의 구현인 window.fetch 메서드를 사용해야 한다
