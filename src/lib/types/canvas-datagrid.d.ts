declare module 'canvas-datagrid' {
    interface CanvasDataGridOptions {
        parentNode: HTMLElement;
        data: any[];
        editable?: boolean;
        allowColumnResize?: boolean;
        allowRowResize?: boolean;
    }

    class CanvasDataGrid {
        constructor(options: CanvasDataGridOptions);
        resize(): void;
    }

    export = CanvasDataGrid;
}