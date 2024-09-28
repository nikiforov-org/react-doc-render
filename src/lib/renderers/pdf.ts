// renderers/pdf.tsx
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { Renderer } from '../types/renderers';

// GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url,
// ).toString();
GlobalWorkerOptions.workerSrc = './pdf.worker.min.js'

const pdf: Renderer = async (buffer, setContent, extension) => {
    try {
        const pdf = await getDocument({ data: buffer }).promise;
        const numPages = pdf.numPages;
        const images: string[] = [];

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            if (context) {
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({ canvasContext: context, viewport }).promise;
                images.push(canvas.toDataURL());
            }
        }

        const content = images.map((src) => `<img src="${src}" alt="PDF Page" />`).join('');
        const html = `<div id="rdr-content" class="rdr-content-pdf">${content}</div>`;
        setContent({ html });
    } catch (error) {
        console.error('Error rendering PDF:', error);
        setContent(null);
    }
};

export default pdf;
