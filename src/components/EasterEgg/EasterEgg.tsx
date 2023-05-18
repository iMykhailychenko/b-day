import { FC, useEffect, useState } from 'react';

import { Image } from '@chakra-ui/react';

import css from './EasterEgg.module.css';

export const EasterEgg: FC = () => {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 100);
    }, []);

    return (
        <div className={open ? css.wrp + ' ' + css.open : css.wrp}>
            <Image className={css.img} src="/harold.png" alt="" />
        </div>
    );
};
