import { FC, useEffect } from 'react';

import { Stack, Heading, Button } from '@chakra-ui/react';

import { confetti } from '@app/components/Confetti';
import { usePage } from '@app/providers/page.provider';

export const FakeNextButton: FC = () => {
    const { prevPage, nextPage } = usePage();

    useEffect(() => {
        confetti.run();
    }, []);

    return (
        <>
            <Stack alignItems="center" spacing={20}>
                <Heading size="4xl">Ураааа!!!</Heading>
                <Button py="30px" px="60px" size="lg" colorScheme="blue" onClick={prevPage}>
                    Назад
                </Button>
            </Stack>

            <Button size="xs" onClick={nextPage} position="fixed" left="1rem" bottom="1rem">
                Далі
            </Button>
        </>
    );
};
