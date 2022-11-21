import React, { lazy, Suspense } from 'react';

const LazyCreateGameModalContent = lazy(() => import('./CreateGameModalContent'));

const CreateGameModalContent = props => (
  <Suspense fallback={null}>
    <LazyCreateGameModalContent {...props} />
  </Suspense>
);

export default CreateGameModalContent;
