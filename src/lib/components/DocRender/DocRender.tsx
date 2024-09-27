// src/lib/components/DocRender/DocRender.tsx
import React, { useEffect, useState } from 'react';
import { detectMimeType } from '../../utils/detectMimeType';
import './DocRender.scss';
import { DefaultLoading, DefaultNotSupported, defaultRenderers } from './DocRender.config';

export interface DocRenderProps extends React.HTMLAttributes<HTMLDivElement> {
    uri: string;
    loading?: React.FC;
    notSupported?: React.FC;
    renderers?: {
        [key: string]: (buffer: ArrayBuffer, setContent: React.Dispatch<React.SetStateAction<string | null>>, extension: string) => Promise<void>;
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
    const [content, setContent] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const RENDERERS = React.useMemo(() => ({ ...defaultRenderers, ...renderers }), [renderers]);

    useEffect(() => {
        const fetchFile = async () => {
            setIsLoading(true);
            if (isFetched) return;

            setIsFetched(true);
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
            } catch (error) {
                console.error('Error fetching or determining file type:', error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFile();
    }, [uri, RENDERERS, isFetched]);

    if (isLoading) return <Loading />;

    if (hasError) return <NotSupported />;

    if (content) return <div {...props} dangerouslySetInnerHTML={{ __html: content }} />;

    return null;
};

export default DocRender;
