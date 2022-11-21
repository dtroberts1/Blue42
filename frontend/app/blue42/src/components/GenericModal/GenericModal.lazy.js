import React, { lazy, Suspense } from 'react';

const LazyGenericModal = lazy(() => import('./GenericModal'));

const GenericModal = props => (
  <Suspense fallback={null}>
    <LazyGenericModal {...props} />
  </Suspense>
);

export default GenericModal;
