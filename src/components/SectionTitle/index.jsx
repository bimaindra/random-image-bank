import React from 'react';

const SectionTitle = (props) => {
	return (
		<>
			{props.type === 'h1' ? (
				<h1 className='mb-4 font-heading text-2xl font-bold'>{props.children}</h1>
			) : (
				<h2 className='mb-4 font-heading text-xl font-bold'>{props.children}</h2>
			)}
		</>
	);
}

export default SectionTitle;
