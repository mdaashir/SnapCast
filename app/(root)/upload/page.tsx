'use client';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useFileInput } from '@/lib/hooks/useFileInput';
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from '@/constants';
import FormField from '@/components/FormField';
import FileInput from '@/components/FileInput';

const UploadPage = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [videoDuration, setVideoDuration] = useState<number | null>(null);
	const [formData, setFormData] = useState<VideoFormValues>({
		title: '',
		description: '',
		tags: '',
		visibility: 'public',
	});
	const video = useFileInput(MAX_VIDEO_SIZE);
	const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

	useEffect(() => {
		if (video.duration !== null) {
			setVideoDuration(video.duration);
		}
	}, [video.duration]);

	useEffect(() => {
		const checkForRecordedVideo = async () => {
			try {
				const stored = sessionStorage.getItem('recordedVideo');
				if (!stored) return;

				const { url, name, type, duration } = JSON.parse(stored);
				const blob = await fetch(url).then((res) => res.blob());
				const file = new File([blob], name, { type, lastModified: Date.now() });

				if (video.inputRef.current) {
					const dataTransfer = new DataTransfer();
					dataTransfer.items.add(file);
					video.inputRef.current.files = dataTransfer.files;

					const event = new Event('change', { bubbles: true });
					video.inputRef.current.dispatchEvent(event);

					video.handleFileChange({
						target: { files: dataTransfer.files },
					} as ChangeEvent<HTMLInputElement>);
				}

				if (duration) setVideoDuration(duration);

				sessionStorage.removeItem('recordedVideo');
				URL.revokeObjectURL(url);
			} catch (err) {
				console.error('Error loading recorded video:', err);
			}
		};

		checkForRecordedVideo().then();
	}, [video]);

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();

		setIsSubmitting(true);

		try {
			if (!video.file || !thumbnail.file) {
				setError('Please upload video and thumbnail files.');
				return;
			}

			if (!formData.title || !formData.description) {
				setError('Please fill in all required fields.');
				return;
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className='wrapper-md upload-page'>
			<h1>Upload a video</h1>
			{error && <div className='error-field'>{error}</div>}
			<form
				className='rounded-20 gap-6 w-full flex flex-col shadow-10 px-5 py-7.5'
				onSubmit={onSubmit}>
				<FormField
					id='title'
					label='Title'
					value={formData.title}
					onChange={handleInputChange}
					placeholder='Enter a clear and concise video title'
				/>

				<FormField
					id='description'
					label='Description'
					value={formData.description}
					onChange={handleInputChange}
					placeholder='Briefly describe what this video is about'
					as='textarea'
				/>

				<FileInput
					id='video'
					label='Video'
					accept='video/*'
					file={video.file}
					previewUrl={video.previewUrl}
					inputRef={video.inputRef}
					onChange={video.handleFileChange}
					onReset={video.resetFile}
					type='video'
				/>

				<FileInput
					id='thumbnail'
					label='Thumbnail'
					accept='image/*'
					file={thumbnail.file}
					previewUrl={thumbnail.previewUrl}
					inputRef={thumbnail.inputRef}
					onChange={thumbnail.handleFileChange}
					onReset={thumbnail.resetFile}
					type='image'
				/>

				<FormField
					id='visibility'
					label='Visibility'
					value={formData.visibility}
					onChange={handleInputChange}
					as='select'
					options={[
						{ value: 'public', label: 'Public' },
						{ value: 'private', label: 'Private' },
					]}
				/>

				<button type='submit' disabled={isSubmitting} className='submit-button'>
					{isSubmitting ? 'Uploading...' : 'Upload Video'}
				</button>
			</form>
		</main>
	);
};

export default UploadPage;
