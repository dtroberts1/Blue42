import React, { lazy, Suspense } from 'react';

const LazySim = lazy(() => import('./Sim'));

const Sim = props => (
  <Suspense fallback={null}>
    <LazySim {...props} />
  </Suspense>
);

export default Sim;
