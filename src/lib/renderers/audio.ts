// renderers/audio.ts
import { RendererFunction } from '../types';

const audio: RendererFunction = async (buffer: ArrayBuffer, setContent: (content: { html: string }) => void, mimeType: string) => {
    const audioBlob = new Blob([buffer], { type: mimeType });
    const audioUrl = URL.createObjectURL(audioBlob);
    const content = `
        <audio controls>
            <source src="${audioUrl}" type="${mimeType}">
        </audio>
    `;

    const html = `<div id="rdr-content" class="rdr-content-audio">${content}</div>`;

    setContent({ html });
};

export default audio;
