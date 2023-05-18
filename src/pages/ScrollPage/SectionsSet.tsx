import { FC } from 'react';

import { Heading } from '@chakra-ui/react';

import { Section } from '@app/pages/ScrollPage/Section';

export const SectionsSet: FC<Record<'items', string[]>> = ({ items }) => {
    return (
        <>
            {items.map(item => (
                <Section key={item}>
                    <Heading textAlign="center" size="4xl">
                        {item}
                    </Heading>
                </Section>
            ))}
        </>
    );
};
