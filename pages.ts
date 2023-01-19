import HomePage from 'components/HomePage/HomePage';
import HeroPage from 'components/HomePage/HeroPage';
import RecipeOverview from 'components/RecipeOverview/RecipeOverview';
import LoginPage from 'components/Authentication/LoginPage';
import SignUpPage from 'components/Authentication/SignUpPage';

export const publicPages = [
  {
    page: LoginPage,
    name: 'Login',
  },
  {
    page: SignUpPage,
    name: 'SignUp',
  },
  {
    page: HeroPage,
    name: 'Hero',
  },
];

export const privatePages = [
  {
    page: HomePage,
    name: 'Home',
  },
  {
    page: RecipeOverview,
    name: 'RecipeOverview',
  },
];
