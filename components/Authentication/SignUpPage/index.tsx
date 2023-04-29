import { lazy, Suspense } from 'react';

const LazySignUpPage = lazy(
  () => import(/* webpackChunkName: "LazySignUpPage" */ './SignUpPage'),
);

const SignUpPage = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazySignUpPage {...props} />
  </Suspense>
);

export default SignUpPage;
