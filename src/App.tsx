// App.tsx
import { DocRender } from "./lib";
import React from 'react';
import { Renderer } from "./lib/types/renderers";

const CustomLoading: React.FC = () => {
    return <>Loading...</>;
};

const CustomNotSupported: React.FC = () => {
    return <>Not supported</>;
};

const myCustomYmlRenderer: Renderer = async (buffer, setContent, extension) => {
    const text = new TextDecoder().decode(buffer);
    const content = `<p>Output from my custom ${extension}-renderer:</p><pre>${text}</pre>`;
    const html = `<div id="rdr-content" class="rdr-content-customRenderer">${content}</div>`;
    const callback = () => console.log(`${extension}-file was successfully rendered`);
    setContent({ html, callback });
};

const customRenderers = {
    'yml': myCustomYmlRenderer,
};

const App = () => {
    return (
        <>
            <DocRender
                uri="./files/xlsx.xlsx"
                //uri="./files/pdf.pdf"
                loading={CustomLoading}
                notSupported={CustomNotSupported}
                renderers={customRenderers}
                className="mx-auto"
                style={{ position: 'absolute' }}
            />
        </>
    );
};

export default App;
