import React from 'react';

const Loader = (props) => {
	return (
		<>
			<div className={`${props.isLoading === true ? 'block' : 'hidden'} ${props.className}`}>
				<div>
					<div className='loader'>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Loader;
