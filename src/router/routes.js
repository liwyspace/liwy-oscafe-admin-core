import portalSDK from 'PortalSDK';
import Example from '../components/Example';
import WebProject from '../components/WebProjectManage/WebProject';

export const routes = [{
    path: '/temp',
    name: '示例页面',
    icon: 'el-icon-setting',
    component: portalSDK.AppMain,
    children: [{
        path: '/example',
        name: '示例1',
        icon: 'el-icon-document',
        component: Example,
        leaf: true
    }, {
        path: '/example2',
        name: '示例2',
        icon: 'el-icon-message',
        component: portalSDK.AppMainChildren,
        children: [{
            path: '/example2_1',
            name: '示例2-1',
            icon: 'el-icon-caret-right',
            component: portalSDK.AppMainChildren,
            leaf: true,
            redirect: '/example2_1/list',
            children: [{
                path: '/example2_1/list',
                name: '内容列表',
                component: Example
            }, {
                path: '/example2_1/save',
                name: '内容添加'
            }, {
                path: '/example2_1/update',
                name: '内容修改'
            }]
        }]
    }]
}, {
    path: '/core',
    name: '核心基础',
    icon: 'el-icon-location',
    component: portalSDK.AppMain,
    children: [{
        path: '/webProject',
        name: '前端项目配置',
        icon: 'el-icon-setting',
        component: WebProject,
        leaf: true
    }, {
        path: '/data',
        name: '数据字典',
        leaf: true
    }, {
        path: '/activite',
        name: '工作流',
        leaf: true
    }, {
        path: '/crontab',
        name: '定时任务',
        leaf: true
    }, {
        path: '/ftp',
        name: 'FTP管理',
        leaf: true
    }, {
        path: '/oss',
        name: 'OSS管理',
        leaf: true
    }, {
        path: '/smsServer',
        name: '短信服务',
        children: [{
            path: '/smsServer/smsServer',
            name: '短信服务管理',
            leaf: true,
            redirect: '/smsServer/smsServer/list',
            children: [{
                path: '/smsServer/smsServer/list',
                name: '短信服务列表'
            }, {
                path: '/smsServer/smsServer/add',
                name: '短信服务添加'
            }, {
                path: '/smsServer/smsServer/edit',
                name: '短信服务修改'
            }]
        }, {
            path: '/smsServer/smsServer/smsRecord',
            name: '短信使用记录',
            leaf: true,
            redirect: '/smsServer/smsServer/smsRecord',
            children: [{
                path: '/smsServer/smsServer/smsRecord',
                name: '短信使用记录列表'
            }]
        }]
    }, {
        path: '/util',
        name: '常用工具',
        children: [{
            path: '/util/dimensioncode',
            name: '二维码生成',
            leaf: true
        }, {
            path: '/util/httptest',
            name: 'HTTP测试工具',
            leaf: true
        }, {
            path: '/util/unicode',
            name: 'Unicode转换工具',
            leaf: true
        }]
    }]
}];
