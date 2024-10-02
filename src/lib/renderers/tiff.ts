// renderers/tiff.ts
import { RendererFunction } from '../types';
import * as Tiff from 'tiff';

const tiff: RendererFunction = async (buffer, setContent, mimeType) => {
    const data = new Uint8Array(buffer);
    const tiffImages = Tiff.decode(data);
    const htmlContent = tiffImages.map((ifd, index) => {
        const canvas = document.createElement('canvas');
        canvas.width = ifd.width;
        canvas.height = ifd.height;
        const context = canvas.getContext('2d');

        if (context) {
            const imageData = context.createImageData(ifd.width, ifd.height);
            const pixels = ifd.data;
            for (let i = 0; i < pixels.length; i++) {
                imageData.data[i] = pixels[i];
            }
            context.putImageData(imageData, 0, 0);
        }

        const jpegUrl = canvas.toDataURL('image/jpeg');
        return `<img src="${jpegUrl}" alt="Page ${index + 1}" />`;
    }).join('');

    const html = `<div id="rdr-content" class="rdr-content-tiff">${htmlContent}</div>`;
    setContent({ html });
};

export default tiff;
