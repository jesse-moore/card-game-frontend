import React from 'react';
import { Card, CardType } from '../game/Card';

const sizeTable = { lg: 1, md: 0.75, sm: 0.5 };
export interface Cards {
    cards: CardType[];
    size: 'lg' | 'md' | 'sm';
}
export const Cards = ({ cards, size = 'lg' }: Cards) => {
    const step = 30;
    const breakAt = 6;
    return (
        <div
            className="lg:-mb-4 w-64 xsm:w-350 lg:w-450 relative z-0"
            style={{
                minHeight: size === 'sm' ? '160px' : size === 'md' ? '240px' : '320px',
            }}
        >
            <div style={{ height: Math.floor(cards.length / breakAt) * sizeTable[size] * 200 }}>
                {cards.map((card, i) => {
                    let x = (i % 6) * step;
                    let y = Math.floor(i / breakAt) * step;
                    return (
                        <Card
                            {...card}
                            size={size}
                            translateX={x}
                            translateY={y}
                            key={`${(card.translateX, card.translateY, i)}`}
                        />
                    );
                })}
                {cards.length === 1 && <Card back translateX={step} size={size} />}
            </div>
        </div>
    );
};
