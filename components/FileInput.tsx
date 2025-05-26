import { ICONS } from '@/constants';
import Image from 'next/image';

const FileInput = ({
	id,
	label,
	accept,
	file,
	previewUrl,
	inputRef,
	onChange,
	onReset,
	type,
}: FileInputProps) => (
	<section className='file-input'>
		<label htmlFor={id}>{label}</label>
		<input
			type='file'
			id={id}
			accept={accept}
			hidden
			ref={inputRef}
			onChange={onChange}
		/>

		{!previewUrl ? (
			<figure onClick={() => inputRef.current?.click()}>
				<Image src={ICONS.upload} alt='Upload Icon' width={24} height={24} />
				<p>click to upload your {id}</p>
			</figure>
		) : (
			<div>
				{type === 'video' ? (
					<video src={previewUrl} controls />
				) : (
					<Image src={previewUrl} alt={`Selected ${id}`} fill />
				)}
				<button type='button' onClick={onReset}>
					<Image src={ICONS.close} alt='Close Icon' width={16} height={16} />
				</button>
				<p>{file?.name}</p>
			</div>
		)}
	</section>
);

export default FileInput;
