import React from 'react';

const Footer = () => {
	return (
		<footer className='bg-slate-500 py-4 text-white'>
			<div className='container mx-auto flex items-center justify-center px-4'>
				<span className='text-sm tracking-wide'>
					by{' '}
					<a
						href='https://twitter.com/bimaindraa'
						rel='noreferrer'
						target='_blank'
						className='transition-colors hover:text-slate-400'>
						@bimaindraa
					</a>
				</span>
			</div>
		</footer>
	);
}

export default Footer;
