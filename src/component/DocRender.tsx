import React from 'react';
import { DocRenderProps } from './DocRender.d';

const DocRender: React.FC<DocRenderProps> = ({ uri, config }) => {
  return (
    <>
      Document URI: {uri}
    </>
  );
};

export default DocRender;