const FormGroup = (props) => {
	return (
		<div className={`mb-6 md:mb-8 xl:mb-10 ${props.className ? props.className : ''}`}>
			{props.children}
		</div>
	);
};

export default FormGroup;
