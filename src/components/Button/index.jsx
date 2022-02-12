import React from 'react';

const Button = (props) => {
	return (
		<button
			type='button'
			className='flex-shrink-0 rounded border-0 bg-slate-500 py-2 px-8 font-body text-sm tracking-wider text-white transition-colors duration-500 ease-out hover:bg-slate-600 focus:outline-none md:text-base'>
			{props.children}
		</button>
	);
};

export default Button;
