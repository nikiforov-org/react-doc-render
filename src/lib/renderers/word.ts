// renderers/word.tsx
import mammoth from 'mammoth';
import { RendererFunction } from '../types';

const word: RendererFunction = async (buffer, setContent, mimeType) => {
    try {
        const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
        const html = `<div id="rdr-content" class="rdr-content-word">${result.value}</div>`;
        setContent({ html });
    } catch (error) {
        console.error('Error converting Word document:', error);
        setContent(null);
    }
};

export default word;
