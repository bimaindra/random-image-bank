import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ title = 'Random Image Bank' }) => {
	return (
		<header className='fixed top-0 z-50 w-full bg-slate-50 py-4 shadow-sm'>
			<div className='container mx-auto flex items-center justify-between px-4'>
				<span className='font-semibold tracking-wider'>{title}</span>
				<ul className='flex gap-x-4'>
					<li>
						<Link to='/' className='transition-colors hover:text-slate-400'>
							Home
						</Link>
					</li>
					<li>
						<Link to='/about' className='transition-colors hover:text-slate-400'>
							About
						</Link>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
