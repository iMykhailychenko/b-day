import { FC } from 'react';

import {
    Button,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useColorMode,
    useDisclosure,
} from '@chakra-ui/react';

import { Section } from '@app/pages/ScrollPage/Section';

export const ButtonImage: FC = () => {
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {isOpen && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Ну ти шо!!
                            <br />
                            Це ж картинка кнопки, а не кнопка.
                            <br />
                            Придивись уважніше
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}

            <Section>
                <Image h="100px" src={isDark ? '/b-day/button-2.png' : '/b-day/button-1.png'} alt="" onClick={onOpen} />
            </Section>
        </>
    );
};
