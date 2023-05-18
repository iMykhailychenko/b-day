import { FC } from 'react';

import { IconButton, Flex, useColorMode, Button } from '@chakra-ui/react';
import { FcIdea, FcNoIdea } from 'react-icons/all';

import { useApp } from '@app/providers/app.provider';
import { usePage } from '@app/providers/page.provider';

const ExtraButton: FC = () => {
    const { page, nextPage } = usePage();
    const { isScrollDone } = useApp();

    if (page === 3 && isScrollDone) {
        return (
            <Button colorScheme="blue" onClick={nextPage}>
                Далі
            </Button>
        );
    }

    return <span />;
};

export const Header: FC = () => {
    const { colorMode, setColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const toggleMode = () => setColorMode(isDark ? 'light' : 'dark');

    return (
        <Flex
            px={4}
            h={20}
            zIndex="modal"
            borderTop="1px"
            borderBottom="1px"
            alignItems="center"
            justifyContent="space-between"
            bg={isDark ? 'gray.700' : 'white'}
            borderColor={isDark ? 'gray.600' : 'gray.300'}
        >
            <ExtraButton />
            <IconButton aria-label="Change theme" onClick={toggleMode} fontSize="30px">
                {isDark ? <FcIdea /> : <FcNoIdea />}
            </IconButton>
        </Flex>
    );
};
