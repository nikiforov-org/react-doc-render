// components/DocRender/DocRender.config.tsx
import React from 'react';
import word from '../../renderers/word';
import image from '../../renderers/image';
import text from '../../renderers/text';
import pdf from '../../renderers/pdf';
import spreadsheet from '../../renderers/spreadsheet';

export const DefaultLoading: React.FC = () => {
    return <>Loading...</>;
};

export const DefaultNotSupported: React.FC = () => {
    return <>Not supported</>;
};

export const defaultRenderers = {
    // Word
    'doc': word,
    'docx': word,
    'odt': word,
    // Images
    'apng': image,
    'png': image,
    'jpg': image,
    'jpeg': image,
    'gif': image,
    'bmp': image,
    'tiff': image,
    // Text
    'txt': text,
    'xml': text,
    'json': text,
    'csv': text,
    // Pdf
    'pdf': pdf,
    // Spreadshhet
    'xls': spreadsheet,
    'xlsx': spreadsheet,
    'ods': spreadsheet,
    'ots': spreadsheet,
};
