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

const App = () => {
    return (
        <>
            <DocRender
                //uri="./files/xlsx.xlsx"
                uri="./files/zip.zip"
                //uri="./files/html.html"
                //uri="./files/csv.csv"
                //uri="./files/xml.xml"
                loading={CustomLoading}
                //message={customMessage}
                //mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                //size={456}
                //renderers={customRenderers}
                limit={limit}
                className="mx-auto"
                style={{ position: 'absolute' }}
            />
        </>
    );
};

export default App;
