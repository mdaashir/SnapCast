import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';

const page = () => {
	return (
		<main className='wrapper page'>
			<Header title='All Videos' subHeader='Public Library' />
			<h1 className='text-2xl font-karla'>Welcome to mdaashir</h1>
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
		</main>
	);
};

export default page;
