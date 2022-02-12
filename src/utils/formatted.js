export const formatDate = (date) => {
	const dateFormat = new Date(date).toLocaleDateString('en-us', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
	return dateFormat;
};

export const formatNumber = (num) => {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
