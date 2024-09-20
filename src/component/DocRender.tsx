// DocRender.tsx
import React, { useEffect, useState } from 'react';
import { DocRenderProps } from './DocRender.d';
import { fileTypeFromBuffer } from 'file-type';
import defaultConfig from './config';

const DocRender: React.FC<DocRenderProps> = ({ uri, config }) => {
  const [ext, setExt] = useState<string | undefined>();
  const CONFIG = { ...defaultConfig, ...config };

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(uri);
        const buffer = await response.arrayBuffer();
        const fileType = await fileTypeFromBuffer(new Uint8Array(buffer));
        const fileExtension = fileType?.ext;
        setExt(fileExtension);

        if (fileExtension && CONFIG.renderers[fileExtension as keyof typeof CONFIG.renderers]) {
          CONFIG.renderers[fileExtension as keyof typeof CONFIG.renderers]();
        }
      } catch (error) {
        console.error('Error fetching or determining file type:', error);
        setExt(undefined);
      }
    };

    fetchFile();
  }, [uri, CONFIG]);

  if (!ext) {
    const LoadingComponent = CONFIG.loading;
    return <LoadingComponent />;
  }

  return (
    <>
      <p>Document URI: {uri}</p>
      <p>File extension: {ext}</p>
    </>
  );
};

export default DocRender;
