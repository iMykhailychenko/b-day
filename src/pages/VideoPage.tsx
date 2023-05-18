import { FC, useEffect, useRef } from 'react';

import { Stack } from '@chakra-ui/react';

import { usePage } from '@app/providers/page.provider';

export const VideoPage: FC = () => {
    const { nextPage } = usePage();

    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        setInterval(() => {
            if ((ref?.current?.currentTime ?? 0) > 20.5) {
                nextPage();
            }
        }, 500);
    }, [nextPage]);

    return (
        <Stack>
            <video ref={ref} autoPlay>
                <track kind="captions" />
                <source src="/video-1.MP4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </Stack>
    );
};
