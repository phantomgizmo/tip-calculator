import React from 'react';

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[40rem] rounded-2xl bg-white p-8">{children}</div>
  );
};

export default Card;
