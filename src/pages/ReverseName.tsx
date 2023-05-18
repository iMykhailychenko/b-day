import { FC, FormEvent, useState } from 'react';

import { Button, Heading, Input, Stack, useToast } from '@chakra-ui/react';

import { usePage } from '@app/providers/page.provider';

const actions = ['ArrowLeft', 'ArrowRight', 'Escape', 'Enter'];

export const ReverseName: FC = () => {
    const { nextPage } = usePage();
    const toast = useToast();
    const [value, setValue] = useState('');

    const onSubmit = (event: FormEvent): void => {
        event.preventDefault();

        if (value.trim() !== 'Богдан') {
            toast({
                status: 'error',
                title: 'Невірно. Спробуй ще!',
            });
            return;
        }

        nextPage();
    };

    return (
        <Stack spacing={5} maxW="500px" as="form" alignItems="center" onSubmit={onSubmit}>
            <Heading size="3xl" textAlign="center">
                Введи своє ім&apos;я щоб продовжити
            </Heading>
            <Input
                size="lg"
                type="text"
                value={value}
                placeholder="Ти точно Богдан? (-_-)"
                onKeyDown={e => {
                    if (actions.includes(e.key)) return;

                    if (e.key === 'Backspace') return setValue('');

                    if (e.key.length !== 1) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }

                    setValue(prev => e.key + prev);
                }}
            />
            <Button colorScheme="blue" type="submit">
                Перевірити
            </Button>
        </Stack>
    );
};
