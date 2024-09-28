// renderers/image.tsx
import { Content, Renderer } from '../types/renderers';

const image: Renderer = async (buffer, setContent, extension) => {
    const blob = new Blob([buffer], { type: `image/${extension}` });
    const url = URL.createObjectURL(blob);
    const content = `<img src="${url}" alt="" />`;
    const html = `<div id="rdr-content" class="rdr-content-image">${content}</div>`;
    setContent({ html });
};

export default image;
