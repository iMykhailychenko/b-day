import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { Box, Input, HStack, FormControl, Heading, Stack, Button, Text } from '@chakra-ui/react';

import { usePage } from '@app/providers/page.provider';

const defaultError = {
    number: '',
    date: '',
    cvv: '',
};

export const BankCard: FC = () => {
    const { nextPage } = usePage();

    const [number, setNumber] = useState('');
    const [date, setDate] = useState('');
    const [cvv, setCvv] = useState('');

    const [error, setError] = useState(defaultError);

    const handleNumber = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value.replace(/\s/g, '');

        if (!isFinite(Number(value))) {
            return;
        }

        setNumber(
            value.split('').reduce((prev, curr, index, array) => {
                if (index + 1 === array.length) {
                    return prev + curr;
                }

                if ((index + 1) % 4 === 0) {
                    return prev + curr + ' ';
                }

                return prev + curr;
            }, ''),
        );
        setError(defaultError);
    };

    const handleDate = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value.replace(/\//g, '');

        if (!isFinite(Number(value))) {
            return;
        }

        setDate(
            value.split('').reduce((prev, curr, index) => {
                if (index === 0 && +curr > 1) {
                    return prev + '0' + curr + '/';
                }

                if (prev.length === 2) {
                    return prev + '/' + curr;
                }

                return prev + curr;
            }, ''),
        );
        setError(defaultError);
    };

    const handleCvv = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!isFinite(Number(event.target.value))) {
            return;
        }

        setCvv(event.target.value);
        setError(defaultError);
    };

    const onSubmit = (event: FormEvent): void => {
        event.preventDefault();
        const numberVal = number.replace(/\s/g, '');
        if (numberVal.length < 16 || !isFinite(Number(numberVal))) {
            setError(prev => ({ ...prev, number: 'Наевалідний номер карти' }));
            return;
        }

        const [month, year] = date.split('/');
        if (!isFinite(Number(month)) || !isFinite(Number(year)) || Number(year) < 23 || Number(month) < 1 || Number(month) > 12) {
            setError(prev => ({ ...prev, date: 'Наевалідний термін дії карти' }));
            return;
        }

        if (!isFinite(Number(cvv)) || cvv.length < 3) {
            setError(prev => ({ ...prev, cvv: 'Наевалідний cvv код' }));
            return;
        }

        nextPage();
    };

    return (
        <Stack spacing={10} alignItems="center" as="form" onSubmit={onSubmit}>
            <Heading maxW="600" size="3xl" textAlign="center">
                Введи номер банківськой карти
            </Heading>
            <Box background="gray.200" p={10} borderRadius="md" w="max-content">
                <HStack>
                    <FormControl isInvalid={!!error.number}>
                        <Input
                            type="tel"
                            maxLength={19}
                            inputMode="numeric"
                            autoComplete="cc-number"
                            placeholder="XXXX XXXX XXXX XXXX"
                            onChange={handleNumber}
                            value={number}
                            background="white"
                            size="lg"
                            minW="240px"
                        />
                    </FormControl>

                    <FormControl isInvalid={!!error.date}>
                        <Input
                            type="text"
                            maxLength={5}
                            placeholder="MM/YY"
                            onChange={handleDate}
                            value={date}
                            background="white"
                            size="lg"
                            w="100px"
                        />
                    </FormControl>

                    <FormControl isInvalid={!!error.cvv}>
                        <Input
                            type="text"
                            maxLength={3}
                            placeholder="CVV"
                            onChange={handleCvv}
                            value={cvv}
                            background="white"
                            size="lg"
                            w="100px"
                        />
                    </FormControl>
                </HStack>
            </Box>

            {(error.number || error.date || error.cvv) && <Text color="red">{error.number || error.date || error.cvv}</Text>}

            <Button colorScheme="blue" size="lg" type="submit">
                Надіслати данні
            </Button>
        </Stack>
    );
};
