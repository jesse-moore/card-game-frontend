import React from 'react';

const Message = () => {
	return (
		<div
			className="absolute -top-6 xsm:top-0 left-1/2 z-50 bg-lightBlue-700 text-white px-8 py-3 rounded shadow-md"
			style={{ transform: 'translate(-50%, -50%)', minWidth: '250px' }}
		>
			<div className="xsm:text-3xl text-lg">
				<div className="flex flex-row flex-nowrap whitespace-nowrap justify-center">
					<div>You Win</div>
					<div className="text-green-400 ml-2">+$50.00</div>
				</div>
			</div>
		</div>
	);
};
