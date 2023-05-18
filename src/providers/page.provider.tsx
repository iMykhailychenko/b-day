import { createContext, FC, ReactNode, useCallback, useContext, useState } from 'react';

interface PageContextType {
    page: number;
    isLoading: boolean;
    setPage: (value: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    stopLoading: () => void;
}

const PageContext = createContext<PageContextType>({} as PageContextType);

export const usePage = (): PageContextType => {
    return useContext(PageContext);
};

export const PageProvider: FC<Record<'children', ReactNode>> = ({ children }) => {
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handlePage = useCallback((value: number): void => {
        setIsLoading(true);
        console.clear();
        setPage(value);
    }, []);

    const nextPage = useCallback((): void => handlePage(page + 1), [handlePage, page]);
    const prevPage = useCallback((): void => handlePage(page - 1), [handlePage, page]);

    const stopLoading = useCallback((): void => setIsLoading(false), []);

    return (
        <PageContext.Provider value={{ isLoading, page, setPage: handlePage, nextPage, prevPage, stopLoading }}>
            {children}
        </PageContext.Provider>
    );
};
