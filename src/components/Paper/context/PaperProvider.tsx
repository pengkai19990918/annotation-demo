import React, { useReducer } from 'react';
import { PaperContext } from './PaperContext';
import { Reducer, initialState, reducer } from './reducer';

type Props = {
  children: React.ReactNode;
};

export const PaperProvider = ({ children }: Props) => {
  const value = useReducer<Reducer>(reducer, initialState);
  return (
    <PaperContext.Provider value={value}>{children}</PaperContext.Provider>
  );
};
