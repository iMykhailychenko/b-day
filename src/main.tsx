import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';

import { ConfettiContainer } from '@app/components/Confetti';
import { PageWrapper } from '@app/components/PageWrapper';
import { AppProvider } from '@app/providers/app.provider';
import { PageProvider } from '@app/providers/page.provider';
import { App } from '@app/root/App';

import './styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider>
            <PageProvider>
                <AppProvider>
                    <PageWrapper>
                        <App />
                    </PageWrapper>
                    <ConfettiContainer />
                </AppProvider>
            </PageProvider>
        </ChakraProvider>
    </React.StrictMode>,
);
