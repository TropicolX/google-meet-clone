'use client';
import { createContext, ReactNode, useState } from 'react';

type AppContextType = {
  newMeeting: boolean;
  setNewMeeting: (newMeeting: boolean) => void;
};

type AppProviderProps = {
  children: ReactNode;
};

const initialContext: AppContextType = {
  newMeeting: false,
  setNewMeeting: () => null,
};

export const AppContext = createContext<AppContextType>(initialContext);

const AppProvider = ({ children }: AppProviderProps) => {
  const [newMeeting, setNewMeeting] = useState(false);

  return (
    <AppContext.Provider
      value={{
        newMeeting,
        setNewMeeting,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
