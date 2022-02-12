import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import SectionTitle from '../../components/SectionTitle';
import Input from '../../components/Input';
import Loader from '../../components/Loader';

const Home = () => {
	const [image, setImage] = useState([]);
	const [loading, setLoading] = useState(false);
	const [downloading, setDownloading] = useState(false);

	useEffect(() => {
		var mounted = true; // eslint-disable-line
		fetchImage();
		return () => {
			mounted = false;
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const fetchImage = (initial = true) => {
		const endpoint = 'https://api.unsplash.com';
		const key = process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY;

		// loader
		setLoading(true);

		axios
			.get(`${endpoint}/photos/random?client_id=${key}&count=12`)
			.then((response) => {
				initial ? setImage(response.data) : setImage([...image, ...response.data]);
				// loader
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleLoadMore = () => {
		fetchImage(false);
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
			});
	};

	return (
		<>
			<FormGroup>
				<SectionTitle>Searh</SectionTitle>
				<Input />
			</FormGroup>
			<FormGroup>
				<SectionTitle>Image Bank</SectionTitle>
				<div className='grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4'>
					{image.map((image, index) => (
						//console.log(image),
						<Card
							key={index}
							image={image}
							onHandleDownload={(e) => handleDownload(e)}
							isDownloading={downloading}
						/>
					))}
				</div>
			</FormGroup>
			<Loader isLoading={loading} className='mb-6' />
			<FormGroup className={loading ? 'hidden' : ''}>
				<div className='text-center'>
					<button
						type='button'
						className='flex-shrink-0 rounded border-0 bg-slate-500 py-2 px-8 font-body text-sm tracking-wider text-white transition-colors duration-500 ease-out hover:bg-slate-600 focus:outline-none md:text-base'
						onClick={() => handleLoadMore()}>
						More...
					</button>
				</div>
			</FormGroup>
		</>
	);
};

export default Home;
