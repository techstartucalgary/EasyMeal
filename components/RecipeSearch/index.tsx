import { lazy, Suspense } from 'react';

const LazyRecipeSearchPage = lazy(
  () =>
    import(/* webpackChunkName: "LazyRecipeSearchPage" */ './RecipeSearchPage'),
);

const RecipeSearchPage = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyRecipeSearchPage {...props} />
  </Suspense>
);

export default RecipeSearchPage;
