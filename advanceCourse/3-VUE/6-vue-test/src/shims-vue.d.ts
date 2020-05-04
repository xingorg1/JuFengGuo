import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import { Store } from 'vuex'

// declare module '*.vue' {
//   export default Vue
// }
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $store: Store<any>;
    $velocity: any;
    $mutationTypes: any
  }
}
