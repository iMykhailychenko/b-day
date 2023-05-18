import { FC, useState, useRef } from 'react';

import {
    Stack,
    Heading,
    HStack,
    Center,
    Image,
    Button,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalBody,
} from '@chakra-ui/react';
import { range } from 'lodash-es';

import { confetti } from '@app/components/Confetti';
import { EasterEgg } from '@app/components/EasterEgg';

const boxes = range(6);

function* imagesFn() {
    yield '/b-day/gift-2.jpg';
    yield '/b-day/gift-3.webp';
    yield '/b-day/gift-4.png';
    yield '/b-day/gift-5.jpg';
    yield '/b-day/gift-6.jpg';
}

export const FinishPage: FC = () => {
    const ref = useRef<HTMLAudioElement>(null);
    const [index, setIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);
    const [modal, setModal] = useState(false);

    const iterator = imagesFn();
    const isSelected = index !== null;

    return (
        <>
            <audio ref={ref} controls hidden>
                <track kind="captions" />
                <source src="/b-day/sound/damage.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <Modal isOpen={modal} onClose={() => null}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Вітаю, ти виграв повістку</ModalHeader>

                    <ModalBody>
                        <Image h="400px" w="100%" objectFit="contain" src="gift-7.jpeg" alt="" />
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Stack alignItems="center" textAlign="center" spacing={10}>
                <Heading size="4xl">
                    Вітаю. Ти дійшов до фіналу!!!
                    <br />
                    Обери свій подарунок
                </Heading>

                <HStack>
                    {boxes.map(item => {
                        const isActive = item === index;

                        return (
                            <Center
                                as="button"
                                key={item}
                                w="15vw"
                                h="400px"
                                border="2px solid"
                                cursor={isSelected ? 'auto' : 'pointer'}
                                bg={isActive || showAll ? 'white' : 'blue.200'}
                                borderColor={isActive ? 'var(--chakra-colors-blue-600)' : 'gray.200'}
                                onClick={
                                    isSelected
                                        ? undefined
                                        : () => {
                                              setIndex(item);
                                              confetti.run();
                                          }
                                }
                            >
                                {isActive ? <Image w="14vw" h="150px" src="gift-1.jpeg" objectFit="contain" alt="" /> : null}
                                {showAll && !isActive ? (
                                    <Image w="14vw" h="150px" src={iterator.next().value as string} objectFit="contain" alt="" />
                                ) : null}
                            </Center>
                        );
                    })}
                </HStack>

                {isSelected ? (
                    showAll ? (
                        <>
                            <Heading>Так як у тебе день народження, ти можеш спробувати ще раз</Heading>
                            <Button
                                size="lg"
                                colorScheme="blue"
                                onClick={() => {
                                    setModal(true);
                                    ref.current?.play();
                                }}
                            >
                                Спробуй ще раз
                            </Button>
                        </>
                    ) : (
                        <Button
                            colorScheme="blue"
                            size="lg"
                            onClick={() => {
                                setShowAll(true);
                                ref.current?.play();
                            }}
                        >
                            Подивитись всі варіанти
                        </Button>
                    )
                ) : (
                    <Center h="48px" />
                )}
            </Stack>

            {showAll && <EasterEgg />}
        </>
    );
};
