// renderers/video.tsx
import { RendererFunction } from '../types';

const video: RendererFunction = async (buffer, setContent, mimeType) => {
    const videoBlob = new Blob([buffer], { type: mimeType });
    const videoSrc = URL.createObjectURL(videoBlob);
    const video = document.createElement('video');
    video.src = videoSrc;
    video.controls = true;

    const html = `<div id="rdr-content" class="rdr-content-video"></div>`;

    const callback = () => {
        document.getElementById('rdr-content')?.appendChild(video);
    };

    setContent({ html, callback });
};

export default video;
