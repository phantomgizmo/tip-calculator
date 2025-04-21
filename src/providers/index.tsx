import { BrowserRouter } from 'react-router-dom';

import React, { Suspense } from 'react';

import Layout from '@/components/layout/Layout';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default AppProvider;
