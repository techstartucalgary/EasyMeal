import { lazy, Suspense } from 'react';

const LazyPantryPage = lazy(
  () => import(/* webpackChunkName: "LazyPantryPage" */ './PantryPage'),
);

const PantryPage = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyPantryPage {...props} />
  </Suspense>
);

export default PantryPage;
