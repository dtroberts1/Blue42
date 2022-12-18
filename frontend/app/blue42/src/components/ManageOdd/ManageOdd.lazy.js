import React, { lazy, Suspense } from 'react';

const LazyManageOdd = lazy(() => import('./ManageOdd'));

const ManageOdd = props => (
  <Suspense fallback={null}>
    <LazyManageOdd {...props} />
  </Suspense>
);

export default ManageOdd;
