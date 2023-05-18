import { FC, useEffect, useState } from 'react';

import { Center, Button } from '@chakra-ui/react';

import { usePage } from '@app/providers/page.provider';

const positions = [
    { top: '10%', left: '80%' },
    { top: '80%', left: '80%' },
    { top: '80%', left: '10%' },
    { top: '10%', left: '10%' },
    { top: '50%', left: '50%' },
];

export const FloatingButton: FC = () => {
    const { nextPage } = usePage();

    const [position, setPosition] = useState(0);
    const [tabIndex, setTabIndex] = useState(-1);

    const nextPosition = (): void => {
        setPosition(prev => {
            if (prev >= 4) return 0;
            return prev + 1;
        });
    };

    useEffect(() => {
        if (position > 1) {
            setTabIndex(0);
        }
    }, [position]);

    return (
        <>
            <Center
                h="200px"
                w="300px"
                position="fixed"
                onMouseEnter={nextPosition}
                {...positions[position]}
                transition="0.2s ease-in-out"
            >
                <Button tabIndex={tabIndex} pointerEvents="none" colorScheme="blue" onClick={nextPage}>
                    Перейти далі
                </Button>
            </Center>
        </>
    );
};
