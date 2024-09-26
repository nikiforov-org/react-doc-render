// App.tsx
import { DocRender } from "./lib";
import React from 'react';

const CustomLoading: React.FC = () => {
    return <>Загрузка...</>;
};

const CustomNotSupported: React.FC = () => {
    return <>MIME-type не поддерживается</>;
};

const myCustomYmlRenderer = async (buffer: ArrayBuffer, setContent: React.Dispatch<React.SetStateAction<string | null>>, extension: string) => {
    const text = new TextDecoder().decode(buffer);
    setContent(`Output for my custom '${extension}'-renderer: ${text}`);
};

const customRenderers = {
    'yml': myCustomYmlRenderer,
};

const App = () => {
    return (
        <>
            <DocRender
                uri="https://upload.wikimedia.org/wikipedia/commons/d/d3/Test.pdf"
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
