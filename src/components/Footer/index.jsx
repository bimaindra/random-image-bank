const Footer = () => {
	return (
		<footer className='bg-slate-500 py-4 text-white'>
			<div className='container mx-auto flex items-center justify-center px-4'>
				<span className='text-xs tracking-wide'>
					&copy; 2022 | Random Image Bank | by{' '}
					<a
						href='https://twitter.com/bimaindraa'
						rel='noreferrer'
						target='_blank'
						className='transition-colors hover:text-slate-300'
						data-gtm='footer_link_twitter'>
						@bimaindraa
					</a>
				</span>
			</div>
		</footer>
	);
};

export default Footer;
