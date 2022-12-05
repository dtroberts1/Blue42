import React, { lazy, Suspense } from 'react';

const LazyBlue42Btn = lazy(() => import('./Blue42Btn'));

const Blue42Btn = props => (
  <Suspense fallback={null}>
    <LazyBlue42Btn {...props} />
  </Suspense>
);

export default Blue42Btn;
