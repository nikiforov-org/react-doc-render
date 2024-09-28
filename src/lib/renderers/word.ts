// renderers/word.tsx
import mammoth from 'mammoth';
import { Renderer } from '../types/renderers';

const word: Renderer = async (buffer, setContent, extension) => {
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
