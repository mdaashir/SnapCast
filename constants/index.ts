export const MAX_VIDEO_SIZE = 500 * 1024 * 1024;
export const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024;

export const BUNNY = {
    STREAM_BASE_URL: process.env.STREAM_BASE_URL,
    STORAGE_BASE_URL: process.env.STORAGE_BASE_URL,
    CDN_URL: process.env.CDN_URL,
    EMBED_URL: process.env.EMBED_URL,
    TRANSCRIPT_URL: process.env.TRANSCRIPT_URL,
};

export const emojis = ['😂', '😍', '👍'];

export const filterOptions = [
    'Most Viewed',
    'Most Recent',
    'Oldest First',
    'Least Viewed',
];

export const visibilities: Visibility[] = ['public', 'private'];

export const ICONS = {
    record: '/assets/icons/record.svg',
    close: '/assets/icons/close.svg',
    upload: '/assets/icons/upload.svg',
};

export const initialVideoState = {
    isLoaded: false,
    hasIncrementedView: false,
    isProcessing: true,
    processingProgress: 0,
};

export const infos = ['transcript', 'metadata'];

export const DEFAULT_VIDEO_CONFIG = {
    width: {ideal: 1920},
    height: {ideal: 1080},
    frameRate: {ideal: 30},
};

export const DEFAULT_RECORDING_CONFIG = {
    mimeType: 'video/webm;codecs=vp9,opus',
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
};
