import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faDownload,
	faClose,
	faHeart,
	faEye,
	faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { formatDate, formatNumber } from '../../utils/formatted';

const Card = ({ image, onHandleDownload, isDownloading }) => {
	const item = {
		image: {
			thumbnail: image.urls.thumb,
			regular: image.urls.regular,
			raw: image.urls.raw,
			alt: image.alt_description
		},
		description: image.description,
		author: image.user.name,
		url: image.urls.raw,
		user: image.user.instagram_username ? image.user.instagram_username : image.user.name,
		likes: image.likes ? image.likes : 0,
		views: image.views ? image.views : 0,
		downloads: image.downloads ? image.downloads : 0,
		date: image.created_at,
		camera: image.exif ? image.exif.name : null,
		aperture: image.exif ? image.exif.aperture : null,
		iso: image.exif ? image.exif.iso : null,
		shutter: image.exif ? image.exif.shutter_speed : null,
		exposure: image.exif ? image.exif.exposure_time : null
	};

	return (
		<div className='group relative overflow-hidden rounded-md border drop-shadow-md transition-all duration-500  ease-out hover:shadow-md hover:drop-shadow-xl'>
			<div className='aspect-video overflow-hidden'>
				<img
					src={item.image.thumbnail}
					alt={item.image.alt}
					className='h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0'
					loading='lazy'
				/>
			</div>
			<div className='relative flex flex-1 flex-col items-center justify-center gap-1 break-words p-2 md:gap-2 md:py-3 md:px-4 xl:flex-row xl:justify-between'>
				<h3 className='text-xs font-bold md:text-sm xl:w-3/5'>@{item.user}</h3>
				<p className='text-xs italic'>{formatDate(item.date)}</p>
			</div>
			<Popup
				trigger={<button className='absolute top-0 left-0 z-10 block h-full w-full'></button>}
				modal
				lockScroll>
				{(close) => (
					<div className='mx-auto rounded-lg bg-white p-6 shadow-lg drop-shadow-lg md:w-[600px] xl:w-[680px] xl:p-8 2xl:w-[920px]'>
						<div className='mx-auto w-full'>
							<button
								className='absolute top-1 right-1 h-5 w-5 border border-dashed border-slate-300 bg-transparent text-sm text-slate-500 outline-none hover:border-slate-600 hover:text-slate-500 focus:outline-none md:h-7 md:w-7 md:text-lg'
								onClick={close}>
								<FontAwesomeIcon icon={faClose} />
							</button>
							<div className='relative'>
								<div className='grid max-h-[60vh] min-h-[60vh] place-items-center border border-dashed border-slate-300 px-4 md:max-h-[55vh] md:min-h-[55vh]'>
									<img
										src={item.image.regular}
										alt={item.alt}
										className='mx-auto max-h-[55vh] max-w-full rounded-md object-cover md:max-h-[50vh]'
										loading='lazy'
									/>
								</div>
								<div className='mt-6 leading-normal'>
									<p className='mb-4'>
										{item.description !== null
											? item.description
											: `The author didn't give any description on this photo`}
										{'. '}
										This photo was uploaded at <b>{formatDate(item.date)}</b> by{' '}
										<b>{item.author}</b>.
									</p>
									{item.camera !== null ? (
										<p className='mb-4'>
											It created using <b>{item.camera}</b>
											{item.aperture ? (
												<span>
													with aperture <b>{item.aperture}</b>,
												</span>
											) : null}
											{item.iso ? (
												<span>
													{' '}
													ISO <b>{item.iso}</b>,
												</span>
											) : null}
											{item.shutter ? (
												<span>
													{' '}
													shutter speed <b>{item.shutter}</b>,
												</span>
											) : null}
											{item.exposure ? (
												<span>
													{' '}
													exposure <b>{item.exposure}</b>.
												</span>
											) : null}
										</p>
									) : null}
									<p className='mb-4'>Below the stats of this photo.</p>
								</div>
								<hr className='my-4 border' />
								<div className='flex justify-around gap-4'>
									{item.views !== 0 ? (
										<span>
											<FontAwesomeIcon icon={faEye} className='mr-2' />
											<b className='text-lg'>{formatNumber(item.views)}</b>{' '}
											<span className='hidden md:inline-block'>views</span>
										</span>
									) : null}
									{item.likes !== 0 ? (
										<span>
											<FontAwesomeIcon icon={faHeart} className='mr-2' />
											<b className='text-lg'>{formatNumber(item.likes)}</b>{' '}
											<span className='hidden md:inline-block'>likes</span>
										</span>
									) : null}
									{item.downloads !== 0 ? (
										<span>
											<FontAwesomeIcon icon={faChevronDown} className='mr-2' />
											<b className='text-lg'>{formatNumber(item.downloads)}</b>{' '}
											<span className='hidden md:inline-block'>downloads</span>
										</span>
									) : null}
								</div>
								<hr className='my-4 border' />
							</div>
							<div className='mt-4 flex items-center justify-center'>
								<a
									href={`${item.image.raw}&q=80&fm=jpg&crop=entropy&cs=tinysrgb`}
									className={`${
										isDownloading ? 'pointer-events-none bg-slate-600' : false
									} flex-shrink-0 cursor-pointer rounded-3xl border-0 bg-slate-500 py-2 px-8 font-body text-sm tracking-wider text-white transition-colors duration-500 ease-out hover:bg-slate-600 focus:outline-none md:text-base`}
									download
									onClick={(e) => {
										e.preventDefault();
										onHandleDownload(e);
									}}>
									<FontAwesomeIcon icon={faDownload} className='mr-2' />

									{isDownloading ? 'Downloading...' : 'Download'}
								</a>
							</div>
						</div>
					</div>
				)}
			</Popup>
		</div>
	);
};

PropTypes.propTypes = {
	props: PropTypes.object,
	onHandleDownload: PropTypes.func,
	isDownloading: PropTypes.bool
};

export default Card;
