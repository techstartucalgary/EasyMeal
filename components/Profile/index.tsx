import { lazy, Suspense } from 'react';

const LazyProfilePage = lazy(
  () => import(/* webpackChunkName: "LazyProfilePage" */ './ProfilePage'),
);

const ProfilePage = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyProfilePage {...props} />
  </Suspense>
);

export default ProfilePage;
