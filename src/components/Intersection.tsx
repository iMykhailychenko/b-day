import { ReactNode, useEffect, useRef, FC } from 'react';

export interface IntersectionProps {
    once?: boolean;
    className?: string;
    threshold?: number;
    onIntersection: (value: boolean) => void;
    children: ReactNode;
}
export const Intersection: FC<IntersectionProps> = ({ onIntersection, children, className, once = false, threshold = 0.5 }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            const handler = (entries: IntersectionObserverEntry[]): void => {
                onIntersection(entries[0].isIntersecting);

                if (once && entries[0].isIntersecting) {
                    observer.unobserve(ref.current as Element);
                }
            };

            const observer = new IntersectionObserver(handler, { threshold });
            observer.observe(ref.current);

            return () => {
                observer.disconnect();
            };
        }
    }, [once, threshold, onIntersection]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
};
