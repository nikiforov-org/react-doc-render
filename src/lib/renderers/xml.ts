// renderers/xml.ts
import { RendererFunction } from '../types';

const escapeHtml = (text: string): string => {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

const xml: RendererFunction = async (buffer: ArrayBuffer, setContent, mimeType) => {
    const decoder = new TextDecoder('utf-8');
    const textContent = decoder.decode(buffer);
    const escapedContent = escapeHtml(textContent);
    const content = `<pre>${escapedContent}</pre>`;
    const html = `<div id="rdr-content" class="rdr-content-text">${content}</div>`;
    setContent({ html });
};

export default xml;
