import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home'

Vue.use(Router);
export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
            redirect: '/app-api',
            children: [{
                    path: '/app-api',
                    name: 'app-api',
                    component: () => import('@/components/Api.vue')
                },
                {
                    path: '/app-echarts',
                    name: 'app-echarts',
                    component: () => import('@/components/AppEcharts.vue')
                },
                {
                    path: '/app-antv',
                    name: 'app-antv',
                    component: () => import('@/components/AppAntv.vue')
                },
                {
                    path: '/app-datetime',
                    name: 'app-datetime',
                    component: () => import('@/components/AppDatetime.vue')
                },
                {
                    path: '/app-vant',
                    name: 'app-vant',
                    component: () => import('@/components/AppVant.vue')
                },

                {
                    path: '/xlsx',
                    name: 'xlsx',
                    component: () => import('@/components/xlsx.vue')
                },
                {
                    path: '/xlsxDown',
                    name: 'xlsxDown',
                    component: () => import('@/components/xlsxDown.vue')
                },
                {
                    path: '/Element',
                    name: 'Element',
                    component: () => import('@/components/Element.vue')
                },
                {
                    path: '/CodeEditor',
                    name: 'CodeEditor',
                    component: () => import('@/components/CodeEditor.vue')
                },
                {
                    path: '/VueCodeMirror',
                    name: 'VueCodeMirror',
                    component: () => import('@/components/VueCodeMirror.vue')
                },
                {
                    path: '/ElementTree',
                    name: 'ElementTree',
                    component: () => import('@/components/ElementTree.vue')
                }

            ]
        },
        {
            path: '*',
            name: 'not-fount',
            component: () => import('@/pages/NotFound')
        }
    ]
})