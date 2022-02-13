import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import Loader from '../../components/Loader';

const Home = () => {
	const [image, setImage] = useState([]);
	const [loading, setLoading] = useState(false);
	const [downloading, setDownloading] = useState(false);
	const [keywordTemp, setKeywordTemp] = useState('');
	const [keyword, setKeyword] = useState('');
	const [page, setPage] = useState(1);

	useEffect(() => {
		var mounted = true; // eslint-disable-line
		fetch(true);
		return () => {
			mounted = false;
		};
	}, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

	const fetch = (initial = true) => {
		const endpoint = 'https://api.unsplash.com';
		const key = process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY;

		// loader
		setLoading(true);

		if (keyword !== '') {
			axios
				.get(`${endpoint}/search/photos?client_id=${key}&query=${keyword}&per_page=12&page=${page}`)
				.then((response) => {
					initial
						? setImage(response.data.results)
						: setImage([...image, ...response.data.results]);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		} else {
			axios
				.get(`${endpoint}/photos/random?client_id=${key}&count=12`)
				.then((response) => {
					initial ? setImage(response.data) : setImage([...image, ...response.data]);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		}
	};

	const handleDownload = (e, filename = 'image') => {
		const source = e.target.href;

		setDownloading(true);

		axios
			.get(source, {
				responseType: 'blob'
			})
			.then((response) => {
				//console.log(response);
				const url = window.URL.createObjectURL(
					new Blob([response.data], {
						type: response.headers['content-type']
					})
				);
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `${filename}.jpeg`);
				document.body.appendChild(link);
				link.click();

				setDownloading(false);
			})
			.catch((err) => {
				console.log(err);
				setDownloading(false);
			});
	};

	const debouncedFetch = useCallback(
		debounce((nextValue) => setKeyword(nextValue), 1000),
		[]
	);

	const handleSearchKeyword = (e) => {
		setKeywordTemp(e.target.value);
		const { value: nextValue } = e.target;
		debouncedFetch(nextValue);
	};

	const handleClearKeyword = (e) => {
		setKeywordTemp('');
		setKeyword('');
	};

	const handleCountPage = (e) => {
		e.preventDefault();
		setPage(page + 1);
	};

	return (
		<div>
			<FormGroup>
				<SectionTitle>Search</SectionTitle>
				<Input
					onHandleSearchKeyword={handleSearchKeyword}
					onHandleClearKeyword={handleClearKeyword}
					placeholder='Type here...'
					useClear={true}
					keyword={keywordTemp}
				/>
			</FormGroup>
			<FormGroup>
				<SectionTitle>Image Bank</SectionTitle>
				{image.length > 0 ? (
					<div className='grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4'>
						{image.map((image, index) => (
							<Card
								key={index}
								image={image}
								onHandleDownload={(e) => handleDownload(e)}
								isDownloading={downloading}
							/>
						))}
					</div>
				) : (
					<div className='grid grid-cols-1'>
						<p>
							We cannot find images you are searching for, maybe a bit spelling mistake ? Maybe try
							another keyword.
						</p>
					</div>
				)}
			</FormGroup>
			<Loader isLoading={loading} className='mb-6' />
			{image.length > 0 ? (
				<FormGroup className={loading ? 'hidden' : ''}>
					<div className='text-center'>
						<button
							type='button'
							className='flex-shrink-0 rounded border-0 bg-slate-500 py-2 px-8 font-body text-sm tracking-wider text-white transition-colors duration-500 ease-out hover:bg-slate-600 focus:outline-none md:text-base'
							onClick={(e) => (keyword !== '' ? (handleCountPage(e), fetch(false)) : fetch(false))}>
							More...
						</button>
					</div>
				</FormGroup>
			) : null}
		</div>
	);
};

export default Home;
