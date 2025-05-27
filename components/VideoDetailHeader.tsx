'use client';

import { daysAgo } from '@/lib/utils';
import { deleteVideo } from '@/lib/actions/video';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const VideoDetailHeader = ({
	title,
	createdAt,
	userImg,
	username,
	videoId,
	ownerId,
	thumbnailUrl,
}: VideoDetailHeaderProps) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const [copied, setCopied] = useState(false);
	const router = useRouter();
	const { data: session } = authClient.useSession();
	const userId = session?.user.id;
	const isOwner = userId === ownerId;

	const handleDelete = async () => {
		try {
			setIsDeleting(true);
			await deleteVideo(videoId, thumbnailUrl);
			router.push('/');
		} catch (error) {
			console.error('Error deleting video:', error);
		} finally {
			setIsDeleting(false);
		}
	};

	const handleCopyLink = () => {
		navigator.clipboard
			.writeText(`${window.location.origin}/video/${videoId}`)
			.then();
		setCopied(true);
	};

	useEffect(() => {
		const changeChecked = setTimeout(() => {
			if (copied) setCopied(false);
		}, 2000);

		return () => {
			clearTimeout(changeChecked);
		};
	}, [copied]);

	return (
		<header className='detail-header'>
			<aside className='user-info'>
				<h1>{title}</h1>
				<figure>
					<button onClick={() => router.push(`/profile/${ownerId}`)}>
						<Image
							src={userImg ?? ''}
							alt='Jason'
							width={24}
							height={24}
							className='rounded-full'
						/>
						<h2>{username ?? 'Guest'}</h2>
					</button>
					<figcaption>
						<span className='mt-1'>・</span>
						<p>{daysAgo(createdAt)}</p>
					</figcaption>
				</figure>
			</aside>
			<aside className='cta'>
				<button onClick={handleCopyLink}>
					<Image
						src={
							copied ? '/assets/images/checked.png' : '/assets/icons/link.svg'
						}
						alt='Copy Link'
						width={24}
						height={24}
					/>
				</button>
				{isOwner && (
					<div className='user-btn'>
						<button
							className='delete-btn'
							onClick={handleDelete}
							disabled={isDeleting}>
							{isDeleting ? 'Deleting...' : 'Delete video'}
						</button>
						<div className='bar' />
					</div>
				)}
			</aside>
		</header>
	);
};

export default VideoDetailHeader;
