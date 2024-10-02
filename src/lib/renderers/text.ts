// renderers/text.tsx
import { RendererFunction } from '../types';

const text: RendererFunction = async (buffer, setContent, mimeType) => {
    const decoder = new TextDecoder('utf-8');
    const textContent = decoder.decode(buffer);
    const content = `<pre>${textContent}</pre>`
    const html = `<div id="rdr-content" class="rdr-content-text">${content}</div>`
    setContent({ html });
};

export default text;
