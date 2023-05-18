import { FC, ReactNode } from 'react';

import { Box, Center } from '@chakra-ui/react';

interface Props {
    children: ReactNode;
    isEnd?: boolean;
}
export const Section: FC<Props> = ({ children, isEnd }) => {
    return (
        <Center flexDirection="column">
            <Box h="35vh" />
            {children}
            <Box h="35vh" />
            {!isEnd && <Box h="200vh" w="0" borderRight="1px dashed" borderColor="gray.200" />}
        </Center>
    );
};
