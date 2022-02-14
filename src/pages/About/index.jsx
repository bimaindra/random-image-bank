const About = () => {
	return (
		<div className='mb-10 xl:mt-4'>
			<article className='wysiwyg wysiwyg-slate mx-auto'>
				<h1>About this app</h1>
				<p>
					Just simple app to show you some random photos from{' '}
					<a href='https://unsplash.com' target='_blank' rel='noreferrer'>
						Unsplash
					</a>
					. You can search for any random photos by search the keyword or you can just click the
					"More..." button to get more random photos.
				</p>
				<p>
					You can view the detail of the photo by clicking the image. You can also download the
					image by clicking the download button.
				</p>
				<blockquote>
					[Disclaimer] <br />
					Sorry if you get any message error related with API. Because currently the API still the
					demo version which mean there is max limitation request in a certain of time. I'm still
					propose to have production version that has more large limitation than the current one. 😃
				</blockquote>
				<p>Here's some stack used to build this app:</p>
				<ol>
					<li>
						<a href='https://reactjs.org/' target='_blank' rel='noreferrer'>
							ReactJS
						</a>
					</li>
					<li>
						<a href='https://reactrouter.com/' target='_blank' rel='noreferrer'>
							React Router
						</a>
					</li>
					<li>
						<a href='https://tailwindcss.com/' target='_blank' rel='noreferrer'>
							TailwindCSS
						</a>
					</li>
					<li>
						<a href='https://axios-http.com/' target='_blank' rel='noreferrer'>
							Axios
						</a>
					</li>
					<li>
						<a href='https://fonts.google.com/' target='_blank' rel='noreferrer'>
							Google Font
						</a>
					</li>
					<li>
						<a href='https://fontawesome.com/' target='_blank' rel='noreferrer'>
							Font Awesome
						</a>
					</li>
				</ol>
				<p>
					You can also run this app into your machine by cloning this{' '}
					<a href='https://github.com/wongdarjo/random-image-bank' target='_blank' rel='noreferrer'>
						repository
					</a>{' '}
					and just follow the instruction on there.
				</p>
				<p>
					Thanks for visiting this app. If you have any feedback, feel free to contact me at{' '}
					<a href='mailto:bimaindramulya@gmail.com' target='_blank' rel='noreferrer'>
						here
					</a>{' '}
					or just ping me on{' '}
					<a href='https://twitter.com/bimaindraa' target='_blank' rel='noreferrer'>
						twitter
					</a>
					. 🙏🏻
				</p>
			</article>
		</div>
	);
};

export default About;
