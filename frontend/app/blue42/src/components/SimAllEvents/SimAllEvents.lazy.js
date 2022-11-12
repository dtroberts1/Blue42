import React, { lazy, Suspense } from 'react';

const LazySimAllEvents = lazy(() => import('./SimAllEvents'));

const SimAllEvents = props => (
  <Suspense fallback={null}>
    <LazySimAllEvents {...props} />
  </Suspense>
);

export default SimAllEvents;
