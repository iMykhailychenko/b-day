import { FC } from 'react';

import { BankCard } from '@app/pages/BankCard';
import { CaptchaPage } from '@app/pages/CaptchaPage';
import { ConsolePage } from '@app/pages/ConsolePage';
import { DateOfBirth } from '@app/pages/DateOfBirth';
import { FakeNextButton } from '@app/pages/FakeNextButton';
import { FinishPage } from '@app/pages/FinishPage';
import { FloatingButton } from '@app/pages/FloatingButton';
import { GuessNumberPage } from '@app/pages/GuessNumberPage';
import { HomePage } from '@app/pages/HomePage';
import { ReverseName } from '@app/pages/ReverseName';
import { ScrollPage } from '@app/pages/ScrollPage';
import { VideoPage } from '@app/pages/VideoPage';
import { usePage } from '@app/providers/page.provider';

const components = [
    <HomePage key={0} />,
    <CaptchaPage key={1} />,
    <VideoPage key={2} />,
    <ScrollPage key={3} />,
    <GuessNumberPage key={4} />,
    <FloatingButton key={5} />,
    <BankCard key={6} />,
    <ConsolePage key={7} />,
    <ReverseName key={8} />,
    <FakeNextButton key={9} />,
    <DateOfBirth key={10} />,
    <FinishPage key={11} />,
];

export const App: FC = () => {
    const { page } = usePage();

    return <>{components[page] ?? components[0]}</>;
};
