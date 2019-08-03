import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'
import store from './store'

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: { hidden: true ,title: '登录',}
    },
    {
      path: '/',
      name: 'layout',
      redirect: '/home',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta: { title: '首页', icon: 'el-icon-s-home', isLogin: true }
        },
        {
          path: '/friends',
          name: 'friends',
          component: () => import('./views/Friends.vue'),
          meta: { title: '好友管理', icon: 'el-icon-s-custom', isLogin: true }
        },
        {
          path: '/group',
          name: 'Group',
          component: () => import('./views/Group.vue'),
          meta: { title: '群聊管理', icon: 'el-icon-s-order', isLogin: true }
        },
        {
          path: '/chart',
          name: 'chart',
          component: () => import('./views/Chart.vue'),
          meta: { title: '数据分析', icon: 'el-icon-s-data', isLogin: true }
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('./views/Setting.vue'),
          meta: { title: '设置', icon: 'el-icon-setting', isLogin: true }
        },
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  let isLogin = await store.dispatch('isLogin');
  document.title = to.meta.title;
  if (!isLogin && to.meta.isLogin) {
    next({ path: '/login' });
  } else {
    next();
  };
});

export default router