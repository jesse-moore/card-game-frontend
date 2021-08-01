import React from 'react';

const sizeTable = { lg: 1, md: 0.75, sm: 0.5 };

export type CardType = (NumberCard | FaceCard | { back: boolean }) & BaseCard;

export const Card = ({ size, translateX, translateY, ...props }: CardType) => {
    if ('faceCard' in props)
        return (
            <BaseCard size={size} translateX={translateX} translateY={translateY}>
                <FaceCard suit={props.suit} faceCard={props.faceCard} />
            </BaseCard>
        );
    if ('number' in props)
        return (
            <BaseCard size={size} translateX={translateX} translateY={translateY}>
                <NumberCard suit={props.suit} number={props.number} />
            </BaseCard>
        );
    if ('back' in props)
        return (
            <BaseCard size={size} translateX={translateX} translateY={translateY}>
                <BackCard />
            </BaseCard>
        );
    return <div className="card text-center pt-28 font-semibold">Invalid Card Type</div>;
};

interface BaseCard {
    size?: 'lg' | 'md' | 'sm';
    translateX?: number;
    translateY?: number;
}

const BaseCard = ({
    size = 'lg',
    children,
    translateX: X = 0,
    translateY: Y = 0,
}: BaseCard & { children: React.ReactNode }) => {
    const width = `${sizeTable[size] * 200}px`;
    const height = `${sizeTable[size] * 280}px`;
    const scale = `scale(${sizeTable[size] * 1})`;
    const t = size === 'md' ? -16 : (1 - sizeTable[size]) * -100;
    const translate = `translate(${t}%, ${t}%)`;
    return (
        <div className="m-3 absolute" style={{ width, height, transform: `translate(${X}%,${Y}%)` }}>
            <div style={{ transform: `${scale} ${translate}` }}>{children}</div>
        </div>
    );
};

const BackCard = () => {
    return <div className="card back" />;
};

type NumberCard = {
    suit: 'club' | 'diamond' | 'spade' | 'heart';
    number: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
};

const NumberCard = ({ number: n, suit }) => {
    return (
        <div className={`card ${suit}${n === 10 ? ' ten' : ''}`}>
            <div className="corner top">
                <span className="number">{n}</span>
                <Suit suit={suit} />
            </div>
            {n > 3 && <Suit className="suit top_left" suit={suit} />}
            {n < 4 && <Suit className="suit top_center" suit={suit} />}
            {n > 3 && <Suit className="suit top_right" suit={suit} />}
            {n > 8 && <Suit className="suit middle_top_left" suit={suit} />}
            {n > 6 && n !== 9 && <Suit className="suit middle_top_center" suit={suit} />}
            {n > 8 && <Suit className="suit middle_top_right" suit={suit} />}
            {n > 5 && n < 9 && <Suit className="suit middle_left" suit={suit} />}
            {(n === 3 || n === 5 || n === 9) && <Suit className="suit middle_center" suit={suit} />}
            {n > 5 && n < 9 && <Suit className="suit middle_right" suit={suit} />}
            {n > 8 && <Suit className="suit middle_bottom_left" suit={suit} />}
            {n > 7 && n !== 9 && <Suit className="suit middle_bottom_center" suit={suit} />}
            {n > 8 && <Suit className="suit middle_bottom_right" suit={suit} />}
            {n > 3 && <Suit className="suit bottom_left" suit={suit} />}
            {n < 4 && <Suit className="suit bottom_center" suit={suit} />}
            {n > 3 && <Suit className="suit bottom_right" suit={suit} />}

            <div className="corner bottom">
                <span className="number">{n}</span>
                <Suit suit={suit} />
            </div>
        </div>
    );
};

type FaceCard = {
    suit: 'club' | 'diamond' | 'spade' | 'heart';
    faceCard: 'king' | 'queen' | 'jack' | 'ace';
};

const FaceCard = ({ suit, faceCard }: FaceCard) => {
    const face = faceCard.charAt(0).toUpperCase();
    return (
        <div className={`card ${suit} ${faceCard}`}>
            <div className="corner top">
                <span className="number">{face}</span>
                <Suit suit={suit} />
            </div>
            <Suit suit={suit} className="suit middle_center" />

            <div className="corner bottom">
                <span className="number">{face}</span>
                <Suit suit={suit} />
            </div>
        </div>
    );
};

interface Suit {
    suit: 'club' | 'diamond' | 'spade' | 'heart';
    className?: string;
}

const Suit = ({ suit, className }: Suit) => {
    switch (suit) {
        case 'club':
            return <span className={className}>&#9824;</span>;
        case 'diamond':
            return <span className={className}>&#9830;</span>;
        case 'spade':
            return <span className={className}>&#9827;</span>;
        case 'heart':
            return <span className={className}>&#9829;</span>;
        default:
            return <span className={className}>invalid suit</span>;
    }
};
