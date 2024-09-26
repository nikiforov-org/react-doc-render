// renderers/word.tsx
import mammoth from 'mammoth';

const word = async (buffer: ArrayBuffer, setContent: React.Dispatch<React.SetStateAction<string | null>>) => {
    try {
        const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
        setContent(`<div class="word-content">${result.value}</div>`);
    } catch (error) {
        console.error('Error converting Word document:', error);
        setContent(null);
    }
};

export default word;
