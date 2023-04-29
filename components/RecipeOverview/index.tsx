import { lazy, Suspense } from 'react';

const LazyRecipeOverview = lazy(
  () => import(/* webpackChunkName: "LazyRecipeOverview" */ './RecipeOverview'),
);

const RecipeOverview = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyRecipeOverview {...props} />
  </Suspense>
);

export default RecipeOverview;
