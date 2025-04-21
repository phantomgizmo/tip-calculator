import React from 'react';

import Title from './Title';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <Title />

      {children}
    </div>
  );
};

export default Layout;
