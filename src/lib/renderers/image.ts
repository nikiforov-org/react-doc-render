// renderers/image.tsx
import { RendererFunction } from '../types';

const image: RendererFunction = async (buffer, setContent, mimeType) => {
    const blob = new Blob([buffer], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const content = `<img src="${url}" alt="" />`;
    const html = `<div id="rdr-content" class="rdr-content-image">${content}</div>`;
    setContent({ html });
};

export default image;
