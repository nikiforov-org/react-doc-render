// renderers/pdf.tsx
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = '../utils/pdf.worker.min.js';

const pdf = async (buffer: ArrayBuffer, setContent: React.Dispatch<React.SetStateAction<string | null>>) => {
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

        const imgTags = images.map((src) => `<img src="${src}" alt="PDF Page" />`).join('');
        setContent(imgTags);
    } catch (error) {
        console.error('Error rendering PDF:', error);
        setContent(null);
    }
};

export default pdf;
