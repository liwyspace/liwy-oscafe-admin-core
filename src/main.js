import Vue from 'vue';
import portalSDK from 'PortalSDK';
import {routes} from './router/routes.js';

console.log('------ liwyCore 开始加载 ------');

Vue.config.productionTip = false;

portalSDK.addRoutes('liwyCore', routes);
console.log('------ liwyCore 加载完成 ------');
