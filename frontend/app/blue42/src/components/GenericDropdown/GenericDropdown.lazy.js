import React, { lazy, Suspense } from 'react';

const LazyGenericDropdown = lazy(() => import('./GenericDropdown'));

const GenericDropdown = props => (
  <Suspense fallback={null}>
    <LazyGenericDropdown {...props} />
  </Suspense>
);

export default GenericDropdown;
