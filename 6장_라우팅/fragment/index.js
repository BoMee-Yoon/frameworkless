import createRouter from './router.js';
import createPages from './pages.js';

/* 
라우터가 동작하게 하려면 라우터를 구성하고 구성 요소를 올바른 프래그먼트에 연결해야 한다
*/

const container = document.querySelector('main');

const pages = createPages(container);

const router = createRouter();

router
  .addRoute('#/', pages.home)
  .addRoute('#/list', pages.list)
  .setNotFound(pages.notFound)
  .start()