import WelcomePage from '../pages/Index';
import LoginPage from '../pages/LoginAfterRegistered';
import ManagePage from '../pages/Manage';

const components = {
  welcome: {
    url: '/welcome',
    component: WelcomePage
  },
  LoginPage: {
    url: '/login',
    component: LoginPage
  },
  manage: {
    url: '/manage',
    component: ManagePage
  }
}

export default {
  guest: {
    allowedRoutes: [components.welcome, components.LoginPage], redirectRoutes: '/welcome' 
  },
  user: {
    allowedRoutes: [components.manage, components.LoginPage], redirectRoutes: '/manage' 
  }
};