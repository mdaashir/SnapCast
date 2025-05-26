import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';

const page = async ({ params }: ParamsWithSearch) => {
	const { id } = await params;
	return (
		<div className='wrapper page'>
			<Header
				subHeader='s.mohamedaashir@gmail.com'
				title='Mohamed Aashir S | mdaashir'
				userImg='/assets/images/dummy.jpg'
			/>
			<h1 className='text-2xl font-karla'> USER ID: {id} </h1>
			<section className='video-grid'>
				<VideoCard
					id='1'
					title='SnapChat Messsage'
					thumbnail='/assets/images/video.png'
					createdAt={new Date('2025-05-25 00:00:00.000')}
					userImg='/assets/images/jason.png'
					username='jason'
					views={20}
					visibility='public'
					duration={156}
				/>
				<VideoCard
					id='1'
					title='SnapChat Messsage'
					thumbnail='/assets/images/video.png'
					createdAt={new Date('2025-05-25 00:00:00.000')}
					userImg='/assets/images/jason.png'
					username='jason'
					views={20}
					visibility='public'
					duration={156}
				/>
				<VideoCard
					id='1'
					title='SnapChat Messsage'
					thumbnail='/assets/images/video.png'
					createdAt={new Date('2025-05-25 00:00:00.000')}
					userImg='/assets/images/jason.png'
					username='jason'
					views={20}
					visibility='public'
					duration={156}
				/>
				<VideoCard
					id='1'
					title='SnapChat Messsage'
					thumbnail='/assets/images/video.png'
					createdAt={new Date('2025-05-25 00:00:00.000')}
					userImg='/assets/images/jason.png'
					username='jason'
					views={20}
					visibility='public'
					duration={156}
				/>
			</section>
		</div>
	);
};

export default page;
