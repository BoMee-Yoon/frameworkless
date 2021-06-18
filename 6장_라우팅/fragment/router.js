/*
라우터는 세 가지 공개 메서드를 가진다
addRoute 메서드는 새 라우터와 프래그먼트로 구성된 구성객체, 구성 요소를 정의한다
setNotFound 메서드는 레지스트리에 없는 모든 프래그먼트에 대한 제네릭 구성 요소를 설정
start 메서드는 라우터를 초기화 하고 url 변경을 청취하기 시작한다
이게 라우터의 공개 인터페이스임
*/
export default () => {
  const routes = [];

  let notFound = () => {};

  const router = {};

  const checkRoutes = () => {
    const currentRoute = routes.find(route => route.fragment === window.location.hash)
    if (!currentRoute) {
      notFound();
      return
    }

    currentRoute.component()
  }

  router.addRoute = (fragment, component) => {
    routes.push({
      fragment,
      component
    })
  
    return router
  } 

  router.setNotFound = cb => {
    notFound = cb;
    return router;
  }

  router.start = () => {
    window.addEventListener('hashchange', checkRoutes);

    if (!window.location.hash) {
      window.location.hash = '#/';
    }

    checkRoutes();
  }

  return router;
}

/*
현재 프래그먼트 식별자는 location 객체의 hash 속성에 저장된다
현재 프래그먼트가 변경될 때마다 알림을 받는 데 사용할 수 있는 아주 편리한 hashchange 이벤트도 있다

checkRoutes 메서드는 라우터의 핵심 메서드다.
이 메서드는 현재 프래그먼트와 일치하는 경로를 찾는다.
경로가 발견되면 해당 구성 요소 함수와 메인 컨테이너에 있는 콘텐츠를 대체한다
발견되지 않으면 일반 notFound 함수가 호출된다
이 메서드는 라우터가 시작될 때와 hashchange 이벤트가 발생할 때마다 호출된다

*/