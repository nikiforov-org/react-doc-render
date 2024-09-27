// App.tsx
import { DocRender } from "./lib";
import React from 'react';

const CustomLoading: React.FC = () => {
    return <>Loading...</>;
};

const CustomNotSupported: React.FC = () => {
    return <>Not supported</>;
};

const myCustomYmlRenderer = async (buffer: ArrayBuffer, setContent: React.Dispatch<React.SetStateAction<string | null>>, extension: string) => {
    const text = new TextDecoder().decode(buffer);
    setContent(`<p>Output for my custom ${extension}-renderer:</p><pre>${text}</pre>`);
};

const customRenderers = {
    'yml': myCustomYmlRenderer,
};

const App = () => {
    return (
        <>
            <DocRender
                //uri="./files/xlsx.xlsx"
                uri="./files/pdf.pdf"
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
