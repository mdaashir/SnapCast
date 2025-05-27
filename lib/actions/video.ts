'use server';

import { db } from '@/drizzle/db';
import { videos } from '@/drizzle/schema';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { apiFetch, getEnv, withErrorHandling } from '@/lib/utils';
import { BUNNY } from '@/constants';
import aj, { fixedWindow, request } from '../arcjet';

// Constants with full names
const VIDEO_STREAM_BASE_URL = BUNNY.STREAM_BASE_URL;
const THUMBNAIL_STORAGE_BASE_URL = BUNNY.STORAGE_BASE_URL;
const THUMBNAIL_CDN_URL = BUNNY.CDN_URL;
const BUNNY_LIBRARY_ID = getEnv('BUNNY_LIBRARY_ID');
const ACCESS_KEYS = {
	streamAccessKey: getEnv('BUNNY_STREAM_ACCESS_KEY'),
	storageAccessKey: getEnv('BUNNY_STORAGE_ACCESS_KEY'),
};

const validateWithArcjet = async (fingerPrint: string) => {
	const rateLimit = aj.withRule(
		fixedWindow({
			mode: 'LIVE',
			window: '1m',
			max: 2,
			characteristics: ['fingerprint'],
		})
	);
	const req = await request();
	const decision = await rateLimit.protect(req, { fingerprint: fingerPrint });
	if (decision.isDenied()) {
		throw new Error('Rate Limit Exceeded');
	}
};

// Helper functions with descriptive names
const revalidatePaths = (paths: string[]) => {
	paths.forEach((path) => revalidatePath(path));
};

const getSessionUserId = async (): Promise<string> => {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) throw new Error('Unauthenticated');
	return session.user.id;
};

// Server Actions
export const getVideoUploadUrl = withErrorHandling(async () => {
	await getSessionUserId();
	const videoResponse = await apiFetch<BunnyVideoResponse>(
		`${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos`,
		{
			method: 'POST',
			bunnyType: 'stream',
			body: { title: 'Temp Title', collectionId: '' },
		}
	);

	const uploadUrl = `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoResponse.guid}`;
	return {
		videoId: videoResponse.guid,
		uploadUrl,
		accessKey: ACCESS_KEYS.streamAccessKey,
	};
});

export const getThumbnailUploadUrl = withErrorHandling(
	async (videoId: string) => {
		const timestampedFileName = `${Date.now()}-${videoId}-thumbnail`;
		const uploadUrl = `${THUMBNAIL_STORAGE_BASE_URL}/thumbnails/${timestampedFileName}`;
		const cdnUrl = `${THUMBNAIL_CDN_URL}/thumbnails/${timestampedFileName}`;

		return {
			uploadUrl,
			cdnUrl,
			accessKey: ACCESS_KEYS.storageAccessKey,
		};
	}
);

export const saveVideoDetails = withErrorHandling(
	async (videoDetails: VideoDetails) => {
		const userId = await getSessionUserId();
		await validateWithArcjet(userId);
		await apiFetch(
			`${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoDetails.videoId}`,
			{
				method: 'POST',
				bunnyType: 'stream',
				body: {
					title: videoDetails.title,
					description: videoDetails.description,
				},
			}
		);

		const now = new Date();
		await db.insert(videos).values({
			...videoDetails,
			videoUrl: `${BUNNY.EMBED_URL}/${BUNNY_LIBRARY_ID}/${videoDetails.videoId}`,
			userId,
			createdAt: now,
			updatedAt: now,
		});

		revalidatePaths(['/']);
		return { videoId: videoDetails.videoId };
	}
);
