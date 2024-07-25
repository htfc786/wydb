import { RouteRecordRaw } from "vue-router";
import IndexView from "../views/index.vue";

/**
 * 路由列表
 */
export default [
  { // 首页
    path: "/",
    name: "index",
    component: IndexView,
    props: true,
  }, {  // collection文集
    path: "/collection",
    name: "collection",
    redirect: "/collection/list",
    props: true,
    children: [
      { // 详细页面
        path: ":id", 
        name: "collection-index",
        component: () => import("../views/collection/index.vue"), 
        props: true,
      },{ // 文集设置页面
        path: ":id/edit", 
        name: "collection-edit", 
        component: () => import("../views/collection/edit.vue"),
      },{ // 文集列表页面
        path: "list",
        name: "collection-list",
        component: () => import("../views/collection/list.vue")
      },{ // 新建文集页面  
        path: "new", 
        name: "collection-new",
        component: () => import("../views/collection/new.vue") 
      },
    ],
  }, { // article文章
    path: "/collection/:id/article", 
    props: true,
    children: [
      { // 新建文章页面  
        path: "new",
        name: "article-new",
        // component: () => import("../views/article/new.vue"),
        redirect: "/404",
      },
    ]
  }, { // 404页面
    path: "/404",
    name: "404",
    component: () => import("../views/404Page.vue"),
  }, {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
] as RouteRecordRaw[];
