import React, { lazy, Suspense } from 'react';

const LazyManageOdds = lazy(() => import('./ManageOdds'));

const ManageOdds = props => (
  <Suspense fallback={null}>
    <LazyManageOdds {...props} />
  </Suspense>
);

export default ManageOdds;
