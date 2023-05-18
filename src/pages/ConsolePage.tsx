import { FC, FormEvent, useEffect, useState } from 'react';

import { Heading, Stack, Input, Button, useToast } from '@chakra-ui/react';

import { usePage } from '@app/providers/page.provider';
import { consoleimg } from '@app/utils/console';

const password = 'Мирного рішення не буде';

export const ConsolePage: FC = () => {
    const { nextPage } = usePage();
    const toast = useToast();
    const [value, setValue] = useState('');

    useEffect(() => {
        consoleimg.load('/img.jpg');

        setTimeout(() => {
            console.log(password);
        }, 500);
    }, []);

    const onSubmit = (event: FormEvent): void => {
        event.preventDefault();
        if (value.trim() === password) {
            nextPage();
            return;
        }

        toast({
            status: 'error',
            title: 'Невірний пароль',
        });
    };

    return (
        <Stack spacing={5} maxW="500px" as="form" alignItems="center" onSubmit={onSubmit}>
            <Heading size="3xl" textAlign="center">
                Введи пароль з консолі
            </Heading>
            <Input size="lg" type="text" placeholder="Пароль" value={value} onChange={e => setValue(e.target.value)} />
            <Button type="submit" colorScheme="blue">
                Перевірити
            </Button>
        </Stack>
    );
};
