// App.tsx
import { DocRender } from "./lib";
import React from 'react';
import { MessageFunction, RendererFunction } from "./lib/types";

const CustomLoading: React.FC = () => {
    return <>Loading...</>;
};

const customMessage: MessageFunction = (text, type) => {
    console.log(`${type}: ${text}`);
};

const myCustomYmlRenderer: RendererFunction = async (buffer, setContent, mimeType) => {
    const text = new TextDecoder().decode(buffer);
    const content = `<p>Output from my custom ${mimeType}-renderer:</p><pre>${text}</pre>`;
    const html = `<div id="rdr-content" class="rdr-content-customRenderer">${content}</div>`;
    const callback = () => console.log(`${mimeType}-file was successfully rendered`);
    setContent({ html, callback });
};

const customRenderers = {
    'yml': myCustomYmlRenderer,
};

const limit = {
    "application/zip": 5242880,
    "application/x-zip-compressed": 5242880
}

const i18n = {
    "de": {
        "error_fetching_the_file": "Fehler beim Abrufen der Datei",
        "unsupported_file_format": "Nicht unterstütztes Dateiformat",
        "unable_to_detect_the_files_mime_type": "Kann den MIME-Typ der Datei nicht erkennen",
        "file_size_exceeds_the_limit": "Dateigröße überschreitet das Limit"
    }
};

const App = () => {
    return (
        <>
            <DocRender
                uri="./files/mov.mov"
            //uri="./files/xlsx.xlsx"
            //uri="./files/zip.zip"
            //uri="./files/html.html"
            //uri="./files/csv.csv"
            //uri="./files/xml.xml"
            //loading={CustomLoading}
            //message={customMessage}
            //mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            //size={456}
            //renderers={customRenderers}
            //limit={limit}
            //className="mx-auto"
            //lang="de"
            //i18n={i18n}
            //style={{ position: 'absolute' }}
            />
        </>
    );
};

export default App;
