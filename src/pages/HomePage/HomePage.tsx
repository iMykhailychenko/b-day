import { FC } from 'react';

import { Button } from '@chakra-ui/react';

import { usePage } from '@app/providers/page.provider';

export const HomePage: FC = () => {
    const { nextPage } = usePage();
    return (
        <>
            <Button colorScheme="blue" onClick={nextPage}>
                Поїхали
            </Button>
        </>
    );
};
