import { FC, useEffect } from 'react';

import { Image, Stack, Heading, Box } from '@chakra-ui/react';

import { Intersection } from '@app/components/Intersection';
import { ButtonImage } from '@app/pages/ScrollPage/ButtonImage';
import { Section } from '@app/pages/ScrollPage/Section';
import { SectionsSet } from '@app/pages/ScrollPage/SectionsSet';
import { useApp } from '@app/providers/app.provider';

const text1 = ['Скроль до низу', 'Не здавайся', 'Вже майже', 'Ну ну', '...', 'Скоро має бути кнопка'];
const text2 = [
    'Доросле життя, воно таке ...',
    'Ніхто не говорив що буде просто',
    'Вже майже ...',
    'Це воно! А, ні. Показалось',
    'За ЗСУ!!!',
    'Мирного рішення не буде',
    'Ти ж нікуди не запізнюєшся?',
    'Бо схоже що ми ще не скоро доскролимо',
    'Вже не так весело?',
    'А ти стійкий',
];
const text3 = [
    'Блін, ну це було близько',
    'Як твій день пройшов?',
    'У тебе рука не болить так довго скролити?',
    'Ну добре добре, ще декілька повідомлень і буде кнопка',
    'У крайньому випадку - ні',
    'Курва, Бобр!',
    'Гарна українка я, і танцюю гопака ...',
    'А я сейчас вам покажу, откуда на Беларусь готовилось нападение',
];

export const ScrollPage: FC = () => {
    const { setIsScrollDone } = useApp();

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            e.preventDefault();
            e.stopPropagation();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    });

    return (
        <Stack>
            <SectionsSet items={text1} />

            <Section>
                <Image src="/mda.webp" h="180px" alt="" />
            </Section>

            <SectionsSet items={text2} />

            <ButtonImage />

            <SectionsSet items={text3} />

            <Intersection once threshold={1} onIntersection={setIsScrollDone}>
                <Box h="50vh" />
            </Intersection>

            <Section isEnd>
                <Heading textAlign="center" size="4xl">
                    Ти виграв, це кінець.
                    <br />
                    Насправді кнопка знаходиться зверху в хедері
                </Heading>
            </Section>
        </Stack>
    );
};
