import React, { lazy, Suspense } from 'react';

const LazyCreateOddsModalContent = lazy(() => import('./CreateOddsModalContent'));

const CreateOddsModalContent = props => (
  <Suspense fallback={null}>
    <LazyCreateOddsModalContent {...props} />
  </Suspense>
);

export default CreateOddsModalContent;
