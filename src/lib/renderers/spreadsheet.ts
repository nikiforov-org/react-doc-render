// renderers/spreadsheet.tsx
import * as XLSX from 'xlsx';
import CanvasDataGrid from 'canvas-datagrid';

const spreadsheet = async (buffer: ArrayBuffer, setContent: React.Dispatch<React.SetStateAction<string | null>>) => {
    try {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: '',
        });

        const container = document.createElement('div');

        document.body.appendChild(container);

        setContent(container.innerHTML);

        const grid = new CanvasDataGrid({
            parentNode: container,
            data: data,
            editable: false,
            allowColumnResize: true,
            allowRowResize: true,
        });

        requestAnimationFrame(() => {
            grid.resize();
        });

    } catch (error) {
        console.error('Error reading spreadsheet:', error);
        setContent(null);
    }
};

export default spreadsheet;
