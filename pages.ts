import HomePage from 'components/HomePage/HomePage';
import LoginPage from './components/Authentication/LoginPage';
import SignUpPage from './components/Authentication/SignUpPage';
import HeroPage from 'components/HomePage/HeroPage';

export const publicPages = [
  {
    page: HeroPage,
    name: 'Hero',
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

export const privatePages = [
  {
    page: HomePage,
    name: 'Home',
  },
];
