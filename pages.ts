import HomePage from 'components/HomePage/HomePage';
import HeroPage from 'components/HomePage/HeroPage';
import RecipeSearchPage from 'components/RecipeSearch/RecipeSearchPage';
import RecipeOverview from 'components/RecipeOverview/RecipeOverview';
import LoginPage from 'components/Authentication/LoginPage';
import SignUpPage from 'components/Authentication/SignUpPage';

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
] as const;

export const privatePages = [
  {
    page: HomePage,
    name: 'Home',
  },
  {
    page: RecipeSearchPage,
    name: 'Search',
  },
] as const;

export type ParamList = {
  RecipeOverview:
    | {
        itemId: number;
      }
    | undefined;
  RecipeSearch: undefined;
  Home: undefined;
  Hero: undefined;
  Login: undefined;
  SignUp: undefined;
  Search: undefined;
};
