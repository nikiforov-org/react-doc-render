# react-doc-render
`react-doc-render` is a lightweight React library designed for rendering documents of various popular MIME types directly in the browser. The library supports formats such as PDF, images (JPEG, PNG, GIF), text files, and Microsoft Office documents (Word, Excel), providing a simple and unified interface to handle different content types.

## Installation
To install the library, run the following command:
```bash
npm install react-doc-render
```

## Usage
1. Import the Component
Import `DocRender` from the library:
```tsx
import { DocRender } from 'react-doc-render';
```

2. Add the Component to the Render Section
Use the `DocRender` component in your application by passing the document URI:
```tsx
<DocRender uri={uri} />
```

## Configuration
The `DocRender` component accepts the following configuration options:

| Parameter      | Type                   | Required | Default              |  Description                                                   |
|----------------|------------------------|----------|----------------------|----------------------------------------------------------------|
| uri            | `string`               |   yes    |    null              | The URI of the document to render.                             |
| loading        | `React.FC`             |   no     | `<>Loading...</>`    | A component to display while the document is loading.          |
| notSupported   | `React.FC`             |   no     | `<>Not supported</>` | A component that is displayed if the document is not supported.|
| renderers      |  &#x2a; renderers type |   no     | library renderers    | Custom rendering functions for handling specific MIME types.   |
| ...otherProps  | `any`                  |   no     |    null              | You can pass any additional props that you want.               |

&#x2a; `Record<string, (buffer: ArrayBuffer, setContent: React.Dispatch<React.SetStateAction<string | null>>, extension: string) => Promise<void>>`

## Example of usage

```tsx
import React from 'react';
import { DocRender } from "react-doc-render";

const CustomLoadingComponent: React.FC = () => {
    return <>Custom loading...</>;
};

const CustomNotSupportedComponent: React.FC = () => {
    return <>Custom `Not supported`</>;
};

const myCustomYmlRendererFunction = async (buffer: ArrayBuffer, setContent: React.Dispatch<React.SetStateAction<string | null>>, extension: string) => {
    const text = new TextDecoder().decode(buffer);
    setContent(`<p>Output for my custom '${extension}'-renderer:<p><pre>${text}</pre>`);
};

const customRenderers = {
    'yml': myCustomYmlRendererFunction,
};

const App = () => {
    return (
        <>
            <DocRender
                uri="./docker-compose.yml"
                loading={CustomLoadingComponent}
                notSupported={CustomNotSupportedComponent}
                renderers={customRenderers}
                className="mx-auto"
                style={{ position: 'absolute' }}
            />
        </>
    );
};

export default App;

```