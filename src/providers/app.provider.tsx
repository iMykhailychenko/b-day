import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react';

interface AppContextType {
    isScrollDone: boolean;
    setIsScrollDone: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const useApp = (): AppContextType => {
    return useContext(AppContext);
};

export const AppProvider: FC<Record<'children', ReactNode>> = ({ children }) => {
    const [isScrollDone, setIsScrollDone] = useState(false);

    return <AppContext.Provider value={{ isScrollDone, setIsScrollDone }}>{children}</AppContext.Provider>;
};
