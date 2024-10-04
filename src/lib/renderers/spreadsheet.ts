// renderers/spreadsheet.tsx
import { read, utils } from 'xlsx';
import CanvasDataGrid from 'canvas-datagrid';
import { RendererFunction } from '../types';

const spreadsheet: RendererFunction = async (buffer, setContent, mimeType) => {
    try {
        const workbook = read(buffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = utils.sheet_to_json(worksheet, {
            header: 1,
            defval: '',
        });

        setContent({
            html: `<div id="rdr-content" class="rdr-content-spreadsheet"></div>`,
            callback: () => {
                const parentNode = document.getElementById('rdr-content');

                if (parentNode) {
                    const grid = new CanvasDataGrid({
                        parentNode,
                        data: data,
                        editable: false,
                        allowColumnResize: true,
                        allowRowResize: true,
                    });

                    requestAnimationFrame(() => {
                        grid.resize();
                    });
                } else {
                    console.error('Element with id "rdr-content" not found.');
                }
            }
        });

    } catch (error) {
        console.error('Error reading spreadsheet:', error);
        setContent(null);
    }
};

export default spreadsheet;
