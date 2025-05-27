'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import RecordScreen from './RecordScreen';
import { updateURLParams } from '@/lib/utils';
import DropdownList from '@/components/DropdownList';
import { ICONS } from '@/constants';

const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [searchQuery, setSearchQuery] = useState(
		searchParams.get('query') || ''
	);

	useEffect(() => {
		setSearchQuery(searchParams.get('query') || '');
	}, [searchParams]);

	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			if (searchQuery !== searchParams.get('query')) {
				const url = updateURLParams(
					searchParams,
					{ query: searchQuery || null },
					pathname
				);
				router.push(url);
			}
		}, 500);
		return () => clearTimeout(debounceTimer);
	}, [searchQuery, searchParams, pathname, router]);

	return (
		<header className='header'>
			<section className='header-container'>
				<figure className='details'>
					{userImg && (
						<Image
							src={userImg}
							alt='user'
							width={66}
							height={66}
							className='rounded-full'
						/>
					)}

					<article>
						<p>{subHeader}</p>
						<h1>{title}</h1>
					</article>
				</figure>

				<aside>
					<Link href='/upload'>
						<Image
							src={ICONS.upload}
							alt='upload'
							width={16}
							height={16}
						/>
						<span>Upload a video</span>
					</Link>
					<RecordScreen />
				</aside>
			</section>

			<section className='search-filter'>
				<div className='search'>
					<input
						type='text'
						placeholder='Search for videos, tags, folders ...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<Image
						src='/assets/icons/search.svg'
						alt='search'
						width={16}
						height={16}
					/>
				</div>

				<DropdownList />
			</section>
		</header>
	);
};

export default Header;
