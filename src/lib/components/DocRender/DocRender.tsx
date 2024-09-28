// src/lib/components/DocRender/DocRender.tsx
import React, { useEffect, useState, useRef } from 'react';
import { detectMimeType } from '../../utils/detectMimeType';
import './DocRender.scss';
import { DefaultLoading, DefaultNotSupported, defaultRenderers } from './DocRender.config';
import { Content, Renderer } from '../../types/renderers';

export interface DocRenderProps extends React.HTMLAttributes<HTMLDivElement> {
    uri: string;
    loading?: React.FC;
    notSupported?: React.FC;
    renderers?: {
        [key: string]: Renderer;
    };
}

const DocRender: React.FC<DocRenderProps> = ({
    uri,
    loading: Loading = DefaultLoading,
    notSupported: NotSupported = DefaultNotSupported,
    renderers = {},
    ...props
}) => {
    const [ext, setExt] = useState<string | undefined>();
    const [content, setContent] = useState<Content | null>(null);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const hasFetched = useRef(false);

    const RENDERERS = { ...defaultRenderers, ...renderers };

    useEffect(() => {
        if (hasFetched.current) return;

        const fetchFile = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(uri);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const arrayBuffer = await response.arrayBuffer();

                let fileExtension = await detectMimeType(arrayBuffer);

                if (!fileExtension) {
                    const urlParts = uri.split('.');
                    fileExtension = urlParts.pop()?.toLowerCase();
                    console.log('Fallback to extension from filename:', fileExtension);
                }

                setExt(fileExtension);

                if (fileExtension) {
                    const renderer = RENDERERS[fileExtension as keyof typeof RENDERERS];
                    if (typeof renderer === 'function') {
                        await renderer(arrayBuffer, setContent, fileExtension);
                    } else {
                        console.error(`No renderer function found for extension: ${fileExtension}`);
                        setHasError(true);
                    }
                } else {
                    setHasError(true);
                }

                hasFetched.current = true;
            } catch (error) {
                console.error('Error fetching or determining file type:', error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFile();
    }, [uri]);

    useEffect(() => {
        if (content?.callback) {
            content.callback();
        }
    }, [content]);

    if (isLoading) return <Loading />;

    if (hasError) return <NotSupported />;

    if (content) return <div {...props} dangerouslySetInnerHTML={{ __html: content.html }} />;

    return null;
};

export default DocRender;
