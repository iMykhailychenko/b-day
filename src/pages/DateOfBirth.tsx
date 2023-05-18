import { FC, useEffect, useState } from 'react';

import { Box, Button, Center, Heading, Stack } from '@chakra-ui/react';

import { usePage } from '@app/providers/page.provider';

export const DateOfBirth: FC = () => {
    const { nextPage } = usePage();
    const [date, setDate] = useState(0);

    useEffect(() => {
        const handler = () => {
            setDate(window.scrollY);
        };
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            e.preventDefault();
            e.stopPropagation();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    });

    return (
        <Box minH="5000px">
            <Center position="fixed" left="50%" top="50%" transform="translate(-50%, -50%)">
                <Stack spacing={20} alignItems="center" textAlign="center">
                    <Heading size="2xl">Введи свою дату народження</Heading>
                    <Heading size="4xl">20.05.{date < 20 ? '____' : date}</Heading>
                </Stack>
            </Center>

            {date === 1997 && (
                <Button
                    size="lg"
                    position="fixed"
                    bottom="2rem"
                    left="50% "
                    colorScheme="blue"
                    onClick={nextPage}
                    transform="translateX(-50%)"
                >
                    Далі
                </Button>
            )}
        </Box>
    );
};
