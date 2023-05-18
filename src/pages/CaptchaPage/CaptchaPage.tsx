import { FC, useState } from 'react';

import { Heading, Flex, Stack, Checkbox, Text, Image, Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { range, shuffle } from 'lodash-es';

import { CaptchaModal } from '@app/pages/CaptchaPage/CaptchaModal';
import { usePage } from '@app/providers/page.provider';

const firstTest = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ21Z5BNQHABfU_jcr8yCP1anuVi4_89-CYDg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW-TCcZ5_H8vi1WUARtLHbUwQFxo4T8GEiDw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ260qk1C9H1rI_HaJjFVTA8amUmrKUAWU-rQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl5CIVG9ZVKmNj4nC3JkZ_UyUyyt0fOhLAZQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTORU8qLoUUYStrCfoihnRe-n-b3TFC0IG-rA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSesDHlWqzZz5tR3c7LOWuE8Ryjn-9igwDG_w&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRfTPmyLkQVwPw4R3d8-4oT3ELqz_4vEz-YQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGVP9S9YZ1Lb0LZjVM_uGtA37t4gDNi7BSTA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTYpA7fcFVlkp0wQ1OTm1Ca3BxbXcSM00T9Q&usqp=CAU',
];

const secondTest = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNag3V0XXWh9bld1f2EbDeWHGsQ5THfrwWIA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJu37vRTtSxIi6h6M-ZXE6-pU_WsMjl1jvGQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUsdL6-KIE07j6Cq8DdRWas_3BmaxBMXHE6Q&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQem4pxB7SIrEes85rSxHHCJ-BkhtYnAx0Smg&usqp=CAU',
    'https://www.lrt.lt/img/2020/08/04/698177-707653-756x425.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVTTDKkMDxD_DYarsFhKu5vzDvg_C23Su6NQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh4OBtbf3myWM7aCs6uW9SeRuvASKsEd_wIw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwuZdqr_cNbYOgTiiNDxV0Ii-hof5y2_tq8Q&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_91x6z50r3STrQQxzS3JN6xUBvDxlxAcOhw&usqp=CAU',
];

const _thirdTest = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlhCVB-bIKe7wIitz_SRa__mdYOpNQ10m3DQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWvKZ9DWI-39YR_2J5KRGtWBzYqtb3d-mvsg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZk_Y3JKSLQcYw08GUR-txWEBYQmYn57jhg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSryxIRnBwi1jJMwbGKzrw6iihJsFuSslAO1Q&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNcBVcqH4VfXgZG-JCHVlYwf9eTrMV_T1dwQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ9RbLANNLWz18Lc6QcHR0ARkifyuCPLCZQw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBur1PJswK7anzfXNM_aVzcdTmz24Qt_dTmI36OQol98CJRS3lnG93bbE1hrS7eXmAv0&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBur1PJswK7anzfXNM_aVzcdTmz24Qt_dTmI36OQol98CJRS3lnG93bbE1hrS7eXmAv0&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnzeDCo5ReLR_nYQaSC9ri8kt06Lal2a_xXg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSUBnX-h3R3HSsgQcqhHT5ubmdD3jbx8QLrQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOX9V0Wfa5xoggy84pjSbgRH7i3opUv1it8w&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5eFtuYgX33AuaSyBieaT4K_nuahtyHyiavA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp5S22f1OUV9QQhgYqlakKjlGkm8V3PUoIow&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBCXmiuJoyJvQsPJ7JJ2yuxwR_WCmzBsjjwA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWvKZ9DWI-39YR_2J5KRGtWBzYqtb3d-mvsg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOkan8ibbu4pOQtMRZEUtIhqJZDOReUgHGjw&usqp=CAU',
];
const thirdTest = [..._thirdTest, ..._thirdTest, ..._thirdTest, ..._thirdTest];
const thirdAnswers = range(64);

export const CaptchaPage: FC = () => {
    const { nextPage } = usePage();
    const [isChecked, setIsChecked] = useState(false);
    const [activeState, setActiveState] = useState(0);

    const captchaMap = [
        <CaptchaModal key={0} title="french car" images={firstTest} answers={[0, 3, 5, 7]} onSuccess={() => setActiveState(1)} />,
        <CaptchaModal
            key={1}
            title="perfect place for a first date"
            images={secondTest}
            answers={[4]}
            onSuccess={() => setActiveState(2)}
        />,
        <CaptchaModal key={2} title="nike" images={shuffle(thirdTest)} answers={thirdAnswers} grid={8} onSuccess={nextPage} />,
    ];

    return (
        <Stack spacing={20} alignItems="center">
            <Heading size="4xl">Доведи що ти Богдан</Heading>

            <Flex
                px={4}
                py={2}
                w={302}
                position="relative"
                borderRadius="3px"
                background="#f9f9f9"
                border="1px solid #d3d3d3"
                boxShadow="0 0 4px 1px rgba(0,0,0,0.08)"
            >
                <Checkbox
                    flexGrow={2}
                    isChecked={false}
                    onChange={() => setIsChecked(true)}
                    sx={{
                        '.chakra-checkbox__control': {
                            width: '28px',
                            height: '28px',
                            border: '2px solid #c1c1c1',
                        },
                    }}
                >
                    <Text ml={1} fontSize="14px" fontWeight="400">
                        I&apos;m not a robot
                    </Text>
                </Checkbox>

                <Image src="/b-day/captcha.png" alt="" h="66px" w="66px" />
            </Flex>

            <Modal isOpen={isChecked} onClose={() => setIsChecked(false)}>
                <ModalOverlay background="rgba(255,255,255,0.5)" />
                <ModalContent w="400px" border="1px solid #dfdfdf" borderRadius={0} boxShadow="none">
                    {captchaMap[activeState] ?? captchaMap[0]}
                </ModalContent>
            </Modal>
        </Stack>
    );
};
