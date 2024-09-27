import Vue from 'vue';
import Router from 'vue-router';
import SuperAdmin from '@/components/SuperAdmin';
import Login from '@/components/Login';
import Register from '@/components/Register';
import UserInfo from '@/components/superadmin/UserInfo';
import EmployeeInfo from '@/components/superadmin/EmployeeInfo';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/SuperAdmin',
      name: 'SuperAdmin',
      component: SuperAdmin,
      children: [
        {
          path: '',  //默认路由
          name: 'UserInfo',
          component: UserInfo
        },
        {
          path: 'UserInfo', 
          name: 'UserInfo',
          component: UserInfo
        },
        {
          path: 'EmployeeInfo',
          name: 'EmployeeInfo',
          component: EmployeeInfo
        }
      ]
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
});
