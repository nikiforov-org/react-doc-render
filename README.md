# react-doc-render
`react-doc-render` is a lightweight React library designed for rendering documents of various popular MIME types directly in the browser. The library supports formats such as PDF, images (JPEG, PNG, GIF), text files, and Microsoft Office documents (Word, Excel), providing a simple and unified interface to handle different content types.

The MIME type detection in the project relies on identifying unique magic numbers—byte sequences at the start of a file. These are compared to known signatures for various formats, such as PDFs, images, or ZIP-based formats like DOCX, XLSX, and PPTX. For ZIP files, internal structure analysis is performed to detect specific formats by checking for format-specific files (e.g., `word/document.xml` for DOCX). If the MIME type cannot be determined through magic numbers, the file extension from the URL is used as a fallback. This ensures robust and accurate detection across multiple file types.

## Installation
To install the library, run the following command:
```bash
npm install react-doc-render
```
Copy PDF-worker to your public directory with `.js` extension:
```bash
cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.min.js
```

## Usage
### 1. Import the Component
Import `DocRender` from the library:
```tsx
import { DocRender } from 'react-doc-render';
```

### 2. Add the Component to the Render Section
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
| ...otherProps  | `Renderer`             |   no     |    null              | You can pass any additional props that you want.               |

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

const myCustomYmlRenderer: Renderer = async (buffer, setContent, extension) => {
    const text = new TextDecoder().decode(buffer);
    const content = `<p>Output from my custom ${extension}-renderer:</p><pre>${text}</pre>`;
    const html = `<div id="rdr-content" class="rdr-content-customRenderer">${content}</div>`;
    const callback = () => console.log(`${extension}-file was successfully rendered`);
    setContent({ html, callback });
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