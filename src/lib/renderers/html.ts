// renderers/text.tsx
import { RendererFunction } from '../types';

const html: RendererFunction = async (buffer, setContent, mimeType) => {
    const decoder = new TextDecoder('utf-8');
    const textContent = decoder.decode(buffer);
    const html = `<div id="rdr-content" class="rdr-content-text">${textContent}</div>`
    setContent({ html });
};

export default html;
