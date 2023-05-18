import { FC, FormEvent, useState } from 'react';

import { Box, Center, Stack, Heading, Code, Flex, FormControl, Input, Button, useToast, HStack } from '@chakra-ui/react';
import { random } from 'lodash-es';

import { usePage } from '@app/providers/page.provider';

export const GuessNumberPage: FC = () => {
    const toast = useToast();
    const { nextPage } = usePage();

    const [number, setNumber] = useState(random(0, 10_000));
    const [value, setValue] = useState<string>('');

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();

        if (number !== Number(value)) {
            setNumber(random(0, 10_000));
            toast({
                status: 'error',
                title: `Не вірно! Правильна відповідь ${number}. Спробуй ще`,
            });
            return;
        }

        toast({
            status: 'success',
            title: 'Правильно! Урааа',
        });
        nextPage();
    };

    return (
        <Box overflowX="auto">
            <Flex h="calc(100vh - 90px)" w="150vw">
                <Center w="100vw">
                    <Stack spacing={10}>
                        <Heading size="4xl" lineHeight={1.4}>
                            Вгадай число яке виведе
                            <br /> <Code fontSize="70px">Math.random</Code>
                            <br />
                            від 1 до 10 000
                        </Heading>

                        <FormControl as="form" onSubmit={handleSubmit}>
                            <HStack spacing={2}>
                                <Input
                                    placeholder="Введи число"
                                    size="lg"
                                    type="number"
                                    value={value}
                                    onChange={e => setValue(e.target.value)}
                                />
                                <Button size="lg" colorScheme="blue" type="submit">
                                    Submit
                                </Button>
                            </HStack>
                        </FormControl>
                    </Stack>
                </Center>

                <Center w="50vw">
                    <Heading ml="25vw" size="2xl">
                        Твоє число: {number}
                    </Heading>
                </Center>
            </Flex>
        </Box>
    );
};
