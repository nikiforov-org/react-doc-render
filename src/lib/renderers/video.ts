// renderers/video.tsx
import { RendererFunction } from '../types';

const video: RendererFunction = async (buffer, setContent, mimeType) => {
    const videoBlob = new Blob([buffer], { type: mimeType });
    const videoUrl = URL.createObjectURL(videoBlob);

    const html = `
        <div id="rdr-content" class="rdr-content-video">
            <video controls>
                <source src="${videoUrl}" type="${mimeType}">
            </video>
        </div>
    `;
    const callback = () => {
        URL.revokeObjectURL(videoUrl);
    };

    setContent({ html, callback });
};

export default video;
