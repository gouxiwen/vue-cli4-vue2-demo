import Router from 'vue-router'



export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/upload'
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/upload.vue'),
      meta: {
        index: 0,
      },
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/calendar.vue'),
      meta: {
        index: 0,
      },
    },
    {
      path: '/calendar1',
      name: 'calendar1',
      component: () => import('../views/calendar1.vue'),
      meta: {
        index: 0,
      },
    },
    {
      path: '/calendar2',
      name: 'calendar2',
      component: () => import('../views/calendar2.vue'),
      meta: {
        index: 0,
      },
    },
    {
      path: '/calendar3',
      name: 'calendar3',
      component: () => import('../views/calendar3.vue'),
      meta: {
        index: 0,
      },
    },
    {
      path: '/videoJs',
      name: 'videoJs',
      component: () => import('../views/videoJs.vue'),
      meta: {
        index: 0,
      },
    },
    {
      path: '/fullCalendarDemo',
      name: 'fullCalendarDemo',
      component: () => import('../views/fullCalendarDemo.vue'),
      meta: {
        index: 0,
      },
    }
  ]
})
