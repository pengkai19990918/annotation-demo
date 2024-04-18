import React, { useReducer } from 'react';
import { PointCloudContext } from './PointCloudContext';

type Props = {
  children: React.ReactNode;
};

export const PaperProvider = ({ children }: Props) => {

  const value = {};
  return (
    <PointCloudContext.Provider value={value}>{children}</PointCloudContext.Provider>
  );
};
