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
	const [statusCode, setStatusCode] = useState(null);
	const [loading, setLoading] = useState(false);
	const [downloading, setDownloading] = useState(false);
	const [keywordTemp, setKeywordTemp] = useState('');
	const [keyword, setKeyword] = useState('');
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(false);
	const [totalPage, setTotalPage] = useState(0);

	useEffect(() => {
		var mounted = true; // eslint-disable-line
		fetch(true);
		return () => {
			mounted = false;
		};
	}, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

	const fetch = (isInitial = true) => {
		const endpoint = 'https://api.unsplash.com';
		const key = process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY;

		// set loader
		setLoading(true);

		// detect is fetching for search or not
		if (keyword !== '') {
			axios
				.get(`${endpoint}/search/photos?client_id=${key}&query=${keyword}&per_page=12&page=${page}`)
				.then((response) => {
					setTotalPage(response.data.total_pages);
					setStatusCode(response.status);
					// fething for the first time or not
					isInitial
						? setImage(response.data.results)
						: setImage([...image, ...response.data.results]);
					// set loader
					setLoading(false);
				})
				.catch((error) => {
					// error handling
					if (error.response) {
						setStatusCode(error.response.status);
					} else if (error.request) {
						setStatusCode(error.request);
					} else {
						console.log('Error', error.message);
					}
					// set loader
					setLoading(false);
				});
		} else {
			axios
				.get(`${endpoint}/photos/random?client_id=${key}&count=12`)
				.then((response) => {
					setStatusCode(response.status);
					// fething for the first time or not
					isInitial ? setImage(response.data) : setImage([...image, ...response.data]);
					setLoading(false);
				})
				.catch((error) => {
					// error handling
					if (error.response) {
						setStatusCode(error.response.status);
					} else if (error.request) {
						setStatusCode(error.request);
					} else {
						console.log('Error', error.message);
					}
					// set loader
					setLoading(false);
				});
		}
	};

	const handleDownloadImageUrl = (e) => {
		return axios
			.get(`${e.target.href}`)
			.then((response) => response.data.url)
			.catch((error) => {
				// Error
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					// console.log(error.response.data);
					//console.log(error.response.status);
					setTimeout(() => {
						setStatusCode(error.response.status);
					}, 500);
					// console.log(error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the
					// browser and an instance of
					// http.ClientRequest in node.js
					//console.log(error.request);
					setTimeout(() => {
						setStatusCode(error.request);
					}, 500);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Error', error.message);
				}
			});
	};

	const handleDownload = async (e, filename = 'image') => {
		// get data image download url
		const dataImageUrl = await handleDownloadImageUrl(e);

		// set downloading
		setDownloading(true);

		axios
			.get(dataImageUrl, {
				responseType: 'blob'
			})
			.then((response) => {
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
				// set downloading
				setDownloading(false);
			})
			.catch((err) => {
				console.log(err);
				// set downloading
				setDownloading(false);
			});
	};

	const debouncedSearchKeyword = useCallback(
		debounce((nextValue) => {
			setKeyword(nextValue);
			setLoading(false);
		}, 3000),
		[]
	);

	const handleSearchKeyword = (e) => {
		setKeywordTemp(e.target.value);
		const { value: nextValue } = e.target;
		debouncedSearchKeyword(nextValue);
	};

	const handleClearKeyword = () => {
		setKeywordTemp('');
		setKeyword('');
		setLastPage(false);
	};

	const handleCountPage = (e) => {
		e.preventDefault();
		setPage(page + 1);

		// detect last page
		const isLast = page + 1;

		if (isLast === totalPage) {
			setPage(1);
			setLastPage(true);
		} else {
			setLastPage(false);
		}
	};

	const renderComponent = () => {
		if (statusCode === null) {
			return (
				<div className='main-container--fullinside grid place-items-center'>
					<Loader isLoading={loading} className='mb-6' />
				</div>
			);
		} else if (statusCode >= 200 && statusCode <= 206) {
			return (
				<div>
					<FormGroup>
						<SectionTitle>Search</SectionTitle>
						<Input
							onHandleSearchKeyword={handleSearchKeyword}
							onHandleClearKeyword={handleClearKeyword}
							placeholder='Type here... (e.g. london, bromo, jogja, etc)'
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
										onHandleDownloadImageUrl={(e) => handleDownloadImageUrl(e)}
										onHandleDownload={(e) => handleDownload(e)}
										isDownloading={downloading}
									/>
								))}
							</div>
						) : (
							<div className='grid grid-cols-1'>
								<p>
									We cannot find images you are searching for, maybe a bit spelling mistake ? Maybe
									try another keyword.
								</p>
							</div>
						)}
					</FormGroup>
					<Loader isLoading={loading} className='mb-6' />
					{image.length > 0 && !lastPage ? (
						<FormGroup className={`mb-10 md:mb-16 xl:mb-20 ${loading ? 'hidden' : ''}`}>
							<div className='text-center'>
								<button
									type='button'
									className='flex-shrink-0 rounded border-0 bg-slate-500 py-2 px-8 font-body text-sm tracking-wider text-white transition-colors duration-500 ease-out hover:bg-slate-600 focus:outline-none md:text-base'
									onClick={(e) =>
										keyword !== '' ? (handleCountPage(e), fetch(false)) : fetch(false)
									}
									data-gtm='load_more'>
									More...
								</button>
							</div>
						</FormGroup>
					) : (
						<div />
					)}
				</div>
			);
		} else {
			return (
				<div className='main-container--fullinside mx-auto grid h-full w-full place-items-center md:w-[640px]'>
					<p className='text-center text-xl md:text-2xl'>
						Opps... Sorry.... <br /> Something went wrong with the API. <br /> Please visit again
						later 🙏🏻😃
					</p>
				</div>
			);
		}
	};

	return <div>{renderComponent()}</div>;
};

export default Home;
