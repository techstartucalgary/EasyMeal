import HomePage from 'components/HomePage/HomePage';
import LoginPage from './components/Authentication/LoginPage';
import SignUpPage from './components/Authentication/SignUpPage';

export const publicPages = [
  {
    page: HomePage,
    name: 'Home',
  },
  {
    page: LoginPage,
    name: 'Login',
  },
  {
    page: SignUpPage,
    name: 'SignUp',
  },
];
