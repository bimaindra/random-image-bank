import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Input = (props) => {
	const {
		placeholder = 'Type here',
		onHandleSearchKeyword,
		onHandleClearKeyword,
		useClear = false,
		keyword
	} = props;

	return (
		<div className='relative'>
			<input
				className={`w-full rounded-md border px-4 py-2 ${useClear ? 'pr-8' : ''}`}
				placeholder={placeholder}
				value={keyword}
				onChange={(e) => onHandleSearchKeyword(e)}
				data-gtm='search_input'
			/>
			{useClear && keyword !== '' && (
				<button
					className='absolute top-[50%] right-0 z-20 h-10 w-10 -translate-y-1/2'
					onClick={(e) => onHandleClearKeyword(e)}>
					<FontAwesomeIcon icon={faClose} />
				</button>
			)}
		</div>
	);
};

PropTypes.propTypes = {
	placeholder: PropTypes.string,
	onHandleSearchKeyword: PropTypes.func,
	onHandleClearKeyword: PropTypes.func,
	useClear: PropTypes.bool,
	keyword: PropTypes.string
};

export default Input;
