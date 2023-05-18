import { FC, useState } from 'react';

import { Flex, Grid, GridItem, Stack, Text, Image, Button, Center, useDisclosure } from '@chakra-ui/react';
import { MdDone } from 'react-icons/all';

interface Props {
    title: string;
    images: string[];
    answers: number[];
    onSuccess: () => void;
    grid?: number;
}
export const CaptchaModal: FC<Props> = ({ title, images, answers, onSuccess, grid = 3 }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [error, setError] = useState<string>('');
    const [values, setValues] = useState<number[]>([]);

    const toggle = (index: number) => {
        setError('');
        setValues(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            }

            return [...prev, index];
        });
    };

    const verify = (): void => {
        onOpen();
        setTimeout(() => {
            if (values.length !== answers.length) {
                setError('Please try again.');
                onClose();
                return;
            }

            if (values.some(i => !answers.includes(i))) {
                setError('Please select all matching images.');
                onClose();
                return;
            }

            onClose();
            onSuccess();
        }, 500);
    };

    return (
        <>
            <Stack m={2} background="#1a73e8" p={4} color="#fff" spacing={2}>
                <Text fontSize="16px" fontWeight="400" lineHeight={1}>
                    Select all squares with
                </Text>
                <Text fontSize="22px" fontWeight="700" lineHeight={1}>
                    {title}
                </Text>
                <Text fontSize="14px" fontWeight="400" lineHeight={1}>
                    Then click verify button
                </Text>
            </Stack>

            <Grid mb={2} mx={2} gap={1} gridTemplateColumns={`repeat(${grid}, 1fr)`}>
                {images.map((item, index) => {
                    const isActive = values.includes(index);
                    const size = (380 / grid) * 0.97;

                    return (
                        <GridItem
                            as="button"
                            key={item}
                            minH={size}
                            display="flex"
                            position="relative"
                            alignItems="center"
                            justifyContent="center"
                            onClick={() => toggle(index)}
                        >
                            {isActive && (
                                <Center
                                    h="30px"
                                    w="30px"
                                    top={0}
                                    left={0}
                                    color="#fff"
                                    position="absolute"
                                    borderRadius="50%"
                                    background="#1a73e8"
                                >
                                    <MdDone />
                                </Center>
                            )}

                            <Image
                                alt=""
                                src={item}
                                objectFit="cover"
                                transition="0.1s ease-in-out"
                                w={isActive ? size * 0.8 : size}
                                h={isActive ? size * 0.8 : size}
                            />
                        </GridItem>
                    );
                })}
            </Grid>

            {error && (
                <Center mb={2}>
                    <Text color="red">{error}</Text>
                </Center>
            )}

            <Flex p={2} borderTop="1px solid #dfdfdf" justifyContent="space-between" alignItems="center">
                <Image w="128px" src="/captcha-footer.png" alt="" />
                <Button
                    colorScheme="blue"
                    color="#fff"
                    borderRadius="2px"
                    background="#1a73e8"
                    isLoading={isOpen}
                    onClick={verify}
                >
                    VERIFY
                </Button>
            </Flex>
        </>
    );
};
