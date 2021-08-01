import React from 'react';
import { MouseEventHandler } from 'react';
export interface ChangeBetButton {
	onClick: MouseEventHandler;
}

export const ChangeBetButton = ({ onClick }: ChangeBetButton) => {
	return (
		<div className="absolute h-full w-full rounded-lg top-0">
			<div className="absolute bg-pokerGreen h-full w-full rounded-lg top-0 opacity-80"></div>
			<div
				className="absolute mx-auto w-max top-1/2 left-1/2"
				style={{ transform: 'translate(-50%, -50%)' }}
			>
				<button
					className="mx-auto bg-lightBlue-700 rounded text-white px-3 py-2 font-semibold"
					onClick={onClick}
				>
					Change Bet
				</button>
			</div>
		</div>
	);
};
