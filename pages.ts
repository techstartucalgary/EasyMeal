import HeroPage from 'components/HomePage/HeroPage';
import RecipeSearchPage from 'components/RecipeSearch';
import LoginPage from 'components/Authentication/LoginPage';
import SignUpPage from 'components/Authentication/SignUpPage';
import PantryPage from 'components/Pantry/PantryPage';
import ProfilePage from 'components/Profile';

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
    page: RecipeSearchPage,
    name: 'Search',
  },
  {
    page: PantryPage,
    name: 'Pantry',
  },
  {
    page: ProfilePage,
    name: 'Profile',
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
  Pantry: undefined;
  Search: undefined;
  Profile: undefined;
  Settings: undefined;
};
