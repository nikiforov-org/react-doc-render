import React, { useEffect, useState, useRef } from 'react';
import './DocRender.scss';
import { DefaultLoading, defaultMessage, defaultRenderers } from './DocRender.config';
import { DocRenderProps, SetContentFunction } from '../../types';
import defaultI18n from '../../data/i18n.json';
import defaultLimit from '../../data/limit.json';

const formatFileSize = (sizeInBytes: number): string => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;
    let size = sizeInBytes;

    while (size >= 1024 && index < units.length - 1) {
        size /= 1024;
        index++;
    }

    return `${size.toFixed(2)} ${units[index]}`;
};

const DocRender: React.FC<DocRenderProps> = ({
    uri,
    loading: Loading = DefaultLoading,
    message = defaultMessage,
    renderers = {},
    i18n = {},
    limit = {},
    lang = 'en',
    mime,
    size,
    ...props
}) => {
    const [content, setContent] = useState<SetContentFunction | null>(null);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [messageText, setMessageText] = useState<string>('');
    const [messageType, setMessageType] = useState<'default' | 'success' | 'error'>('default');
    const hasFetched = useRef(false);

    const RENDERERS = { ...defaultRenderers, ...renderers };
    const I18N = { ...defaultI18n, ...i18n };
    const LIMIT = { ...defaultLimit, ...limit };

    const messages = I18N[lang as keyof typeof I18N] || I18N['en'];

    useEffect(() => {
        if (hasFetched.current) return;

        const fetchFile = async () => {
            setIsLoading(true);
            try {
                let mimeType = mime;
                let fileSize = size;

                if (!(mimeType && fileSize)) {
                    const headResponse = await fetch(uri, { method: 'HEAD' });
                    if (!headResponse.ok) {
                        throw new Error(`${messages.error_fetching_the_file} (HTTP status: ${headResponse.status})`);
                    }

                    fileSize = parseInt(headResponse.headers.get('Content-Length') || '0', 10);
                    mimeType = headResponse.headers.get('Content-Type')?.split(';')[0].toLowerCase().trim();
                }

                if (mimeType && !RENDERERS[mimeType as keyof typeof RENDERERS]) {
                    setMessageText(`${messages.unsupported_file_format} (${mimeType})`);
                    setMessageType('error');
                    setHasError(true);
                    return;
                }

                if (mimeType && LIMIT[mimeType as keyof typeof LIMIT]) {
                    const maxSize = LIMIT[mimeType as keyof typeof LIMIT];
                    if (fileSize > maxSize) {
                        setMessageText(`${messages.file_size_exceeds_the_limit} (${formatFileSize(maxSize)})`);
                        setMessageType('error');
                        setHasError(true);
                        return;
                    }
                }

                const response = await fetch(uri);

                if (!response.ok) {
                    throw new Error(`${messages.error_fetching_the_file} (HTTP status: ${response.status})`);
                }

                const arrayBuffer = await response.arrayBuffer();

                if (mimeType) {
                    const renderer = RENDERERS[mimeType as keyof typeof RENDERERS];
                    if (typeof renderer === 'function') {
                        await renderer(arrayBuffer, setContent, mimeType);
                    }
                }

                hasFetched.current = true;
            } catch (error) {
                if (error instanceof Error) {
                    setMessageText(error.message);
                } else {
                    setMessageText(String(error));
                }
                setMessageType('error');
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFile();
    }, [uri, messages]);

    useEffect(() => {
        if (content?.callback) {
            content.callback();
        }
    }, [content]);

    if (isLoading) return <Loading />;

    if (hasError) return message(messageText, messageType);

    if (content) return <div {...props} dangerouslySetInnerHTML={{ __html: content.html }} />;

    return null;
};

export default DocRender;
