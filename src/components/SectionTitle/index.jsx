const SectionTitle = (props) => {
	return (
		<>
			{props.type === 'h1' ? (
				<h1 className='mb-4 font-heading text-xl font-bold xl:text-2xl'>{props.children}</h1>
			) : (
				<h2 className='mb-4 font-heading text-lg font-bold xl:text-xl'>{props.children}</h2>
			)}
		</>
	);
};

export default SectionTitle;
