import { lazy, Suspense } from 'react';

const LazyLoginPage = lazy(
  () => import(/* webpackChunkName: "LazyLoginPage" */ './LoginPage'),
);

const LoginPage = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyLoginPage {...props} />
  </Suspense>
);

export default LoginPage;
