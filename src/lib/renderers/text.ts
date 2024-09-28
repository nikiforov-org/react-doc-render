// renderers/text.tsx
import { Renderer } from '../types/renderers';

const text: Renderer = async (buffer, setContent, extension) => {
    const decoder = new TextDecoder('utf-8');
    const textContent = decoder.decode(buffer);
    const content = `<pre>${textContent}</pre>`
    const html = `<div id="rdr-content" class="rdr-content-text">${content}</div>`
    setContent({ html });
};

export default text;
