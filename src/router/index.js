import Router from 'vue-router'



export default new Router({
    routes: [
        {
            path: '/',
            redirect:'/upload'
        },
        {
            path: '/upload',
            name: 'upload',
            component:() => import('../views/upload.vue'),
            meta: {
                index:0,
            },
        },
        {
            path: '/test1',
            name: 'test1',
            component:() => import('../views/test1.vue'),
            meta: {
                index:0,
            },
        }
    ]
})
