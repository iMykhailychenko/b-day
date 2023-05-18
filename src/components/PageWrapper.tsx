import { FC, ReactNode, useEffect, useRef, useState } from 'react';

import { Center, Stack, Image, Text } from '@chakra-ui/react';

import { Header } from '@app/layout/Header';
import { usePage } from '@app/providers/page.provider';

import css from './PageWrapper.module.css';

const sounds = [
    { sound: '/sound/2.mp3', time: 22 },
    { sound: '/b-day/sound/3.mp3', time: 25 },
    { sound: '/b-day/sound/5.mp3', time: 16 },
    { sound: '/b-day/sound/1.mp3', time: 18 },
    { sound: '/b-day/sound/6.mp3', time: 27 },
    { sound: '/b-day/sound/4.mp3', time: 38 },
    { sound: '/b-day/sound/7.mp3', time: 23 },
    { sound: '/b-day/sound/8.mp3', time: 25 },
    { sound: '/b-day/sound/9.mp3', time: 15 },
    { sound: '/b-day/sound/10.mp3', time: 20 },
    { sound: '/b-day/sound/11.mp3', time: 20 },
    { sound: '/b-day/sound/12.mp3', time: 28 },
];

export const PageWrapper: FC<Record<'children', ReactNode>> = ({ children }) => {
    const ref = useRef<number>(0);
    const [index, setIndex] = useState(0);
    const { isLoading, stopLoading } = usePage();

    useEffect(() => {
        let id: NodeJS.Timeout;

        if (isLoading) {
            id = setInterval(() => {
                ref.current += 1;

                if (ref.current >= sounds[index].time) {
                    ref.current = 0;
                    stopLoading();
                    setIndex(prev => {
                        if (prev >= sounds.length - 1) return 0;
                        return prev + 1;
                    });
                }
            }, 200);
        }
        return () => {
            clearInterval(id);
        };
    }, [index, isLoading, stopLoading]);

    return (
        <Stack minH="100vh" h="max-content">
            <Header />
            <Center flexGrow={2}>
                {isLoading ? (
                    <Center>
                        <audio controls autoPlay loop hidden>
                            <track kind="captions" />
                            <source src={sounds[index].sound} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                        <Stack spacing={5}>
                            <Image
                                className={css.loader}
                                h="80px"
                                w="80px"
                                borderRadius="50%"
                                objectFit="cover"
                                src="/b-day/loader.jpg"
                                alt=""
                            />
                            <Text>Loading ...</Text>
                        </Stack>
                    </Center>
                ) : (
                    children
                )}
            </Center>
        </Stack>
    );
};
