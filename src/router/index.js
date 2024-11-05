import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import Home from "../views/Home.vue";

const routes = [
  //정적 import 방식 : 메인 페이지 , 첫 화면의 경우 위 방식을 사용한다

  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/",
    name: "myapge",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/MyPage.vue"),
  },
  {
    path: "/join",
    name: "join",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/Join.vue"),
  },
  {
    path: "/board",
    name: "board",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/board/Board.vue"),
  },
  {
    path: "/map",
    name: "map",
    component: () => import(/* webpackChunkName: "about" */ "../views/Map.vue"),
  },

  //동적 import 방식 : 실제로 필요할때만 로딩됨으로 초기 로딩 시간을 줄일 수 있다. ( 로딩 성능 최적화를 할 수 있는 방법)
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
