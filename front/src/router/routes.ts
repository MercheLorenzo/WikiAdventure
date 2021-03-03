import store, { Store } from '../store'
import { RouteConfig } from 'vue-router';
import { GameLoopType } from 'src/store/gameData/type/gameLoop';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('pages/Connect.vue')
  },
  {
    path: '/play/:id',
    beforeEnter: (to, from, next) => {
      var store = Store as any;
      if (store.state.gameData.uuid == "") {
        next('/connect/'+to.params.id);
      } else {
        next();
      }
    },
    component: () => {
      var store = Store as any;
      switch(store.state.gameData.gameLoop as number) {
        case GameLoopType.Classic:
          return import('pages/gameMode/Classic.vue');
      }
      return import('pages/gameMode/Classic.vue');
    }
  },
  {
    path: '/twitch/:id',
    beforeEnter: (to, from, next) => {
      var store = Store as any;
      if (store.state.gameData.uuid == "") {
        next('/twitchConnect/'+to.params.id);
      } else {
        next();
      }
    },
    component: () => {
      return import('pages/gameMode/Classic.vue');
    }
  },
  {
    path: '/connect/:id',
    component: () => {
      return import('pages/Connect.vue');
    }
  },
  {
    path: '/twitchConnect/:id',
    component: () => {
      return import('pages/Connect.vue');
    }
  },
  {
    path: '/test',
    component: () => {
      return import('pages/gameMode/Classic.vue');
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;