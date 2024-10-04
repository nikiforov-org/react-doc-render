// components/DocRender/DocRender.config.tsx
import React from 'react';
import { MessageFunction, RendererFunction } from '../../types';
import word from '../../renderers/word';
import image from '../../renderers/image';
import text from '../../renderers/text';
import pdf from '../../renderers/pdf';
import spreadsheet from '../../renderers/spreadsheet';
import tiff from '../../renderers/tiff';
import zip from '../../renderers/zip';
import html from '../../renderers/html';
import xml from '../../renderers/xml';
import video from '../../renderers/video';
import audio from '../../renderers/audio';

const MessageComponent: React.FC<{ text: string; type: 'default' | 'success' | 'error' }> = ({ text, type }) => {
    return (
        <div
            id={`rdr-message-${type}`}
            className={`rdr-message-${type}`}
        >
            {text}
        </div>
    );
};

export const DefaultLoading: React.FC = () => {
    return <>Loading...</>;
};

export const defaultMessage: MessageFunction = (text, type) => {
    return <MessageComponent text={text} type={type} />
};

export const defaultRenderers: Record<string, RendererFunction> = {
    // Word
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': word,
    // Images
    'image/apng': image,
    'image/png': image,
    'image/jpeg': image,
    'image/gif': image,
    'image/bmp': image,
    'image/svg+xml': html,
    'image/tif': tiff,
    'image/tiff': tiff,
    // Text
    'text/plain': text,
    'application/xml': xml,
    'text/xml': xml,
    'application/json': text,
    'text/csv': text,
    'text/html': html,
    // Pdf
    'application/pdf': pdf,
    // Spreadsheet
    'application/vnd.ms-excel': spreadsheet,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': spreadsheet,
    'application/vnd.oasis.opendocument.spreadsheet': spreadsheet,
    // ZIP
    'application/zip': zip,
    'application/x-zip-compressed': zip,
    // Video
    'video/mp4': video,
    'video/webm': video,
    'video/ogg': video,
    'video/x-msvideo': video,
    'video/quicktime': video,
    'video/mpeg': video,
    'video/x-ms-wmv': video,
    // Audio
    'audio/mpeg': audio,
    'audio/wav': audio,
    'audio/ogg': audio,
    'audio/mp4': audio,
    'audio/aac': audio,
    'audio/x-wav': audio,
};
