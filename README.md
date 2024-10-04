# react-doc-render
`react-doc-render` is a lightweight React library designed for rendering documents of various popular MIME types directly in the browser. The library supports formats such as PDF, images (JPEG, PNG, GIF, SVG, BMP, TIFF), text files (plain text, HTML, XML, CSV, JSON), Microsoft Office documents (Word, Excel), audio files (MP3, WAV, OGG, AAC), video files (MP4, WebM, OGG, AVI, QuickTime, MPEG, WMV), and ZIP archives. It provides a simple and unified interface to handle different content types.

## Supported MIME types

| Extension   | MIME type                                                                | Passed |
|-------------|--------------------------------------------------------------------------|--------|
| .docx       | application/vnd.openxmlformats-officedocument.wordprocessingml.document  | ✅     |
| .apng       | image/apng                                                               | ✅     |
| .png        | image/png                                                                | ✅     |
| .jpeg, .jpg | image/jpeg                                                               | ✅     |
| .gif        | image/gif                                                                | ✅     |
| .bmp        | image/bmp                                                                | ✅     |
| .svg        | image/svg+xml                                                            | ✅     |
| .tif        | image/tif                                                                | ✅     |
| .tiff       | image/tiff                                                               | ✅     |
| .txt        | text/plain                                                               | ✅     |
| .xml        | application/xml                                                          | ✅     |
| .xml        | text/xml                                                                 | ✅     |
| .json       | application/json                                                         | ✅     |
| .csv        | text/csv                                                                 | ✅     |
| .html       | text/html                                                                | ✅     |
| .pdf        | application/pdf                                                          | ✅     |
| .xls        | application/vnd.ms-excel                                                 | ✅     |
| .xlsx       | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet        | ✅     |
| .ods        | application/vnd.oasis.opendocument.spreadsheet                           | ✅     |
| .zip        | application/zip                                                          | ✅     |
| .zip        | application/x-zip-compressed                                             | ✅     |
| .mp4        | video/mp4                                                                | ✅     |
| .webm       | video/webm                                                               | ✅     |
| .ogg        | video/ogg                                                                | ✅     |
| .avi        | video/x-msvideo                                                          | ✅     |
| .mov        | video/quicktime                                                          | ✅     |
| .mpeg, .mpg | video/mpeg                                                               | ✅     |
| .wmv        | video/x-ms-wmv                                                           | ✅     |
| .mp3        | audio/mpeg                                                               | ✅     |
| .wav        | audio/wav                                                                | ✅     |
| .ogg        | audio/ogg                                                                | ✅     |
| .mp4        | audio/mp4                                                                | ✅     |
| .aac        | audio/aac                                                                | ✅     |
| .wav        | audio/x-wav                                                              | ✅     |


MIME types are obtained through a separate request for the `Content-Type` header. You can pass the MIME type and file size directly to reduce the number of requests. This approach streamlines the process and enhances efficiency when handling various file types within the library.

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

| Parameter      | Type                      | Required | Default                                                               |  Description                                                   |
|----------------|---------------------------|----------|-----------------------------------------------------------------------|-----------------------------------------|
| uri            | `string`                  |   yes    |    `null`                                                               | The URI of the document to render.                             |
| loading        | `React.FC`                |   no     | `<>Loading...</>`                                                     | A component to display while the document is loading.          |
| message        | `MessageFunction`         |   no     | `<MessageComponent text={text} type={type} />`                        | Returns a service message, e.g., firing a toast or rendering a component.|
| renderers      | `RendererFunction`        |   no     | Library renderers                                                     | Custom rendering functions for handling specific MIME types.   |
| mime           | `string`                  |   no     |    `null`                                                               | To specify the MIME type directly.                             |
| size           | `number`                  |   no     |    `null`                                                               | To specify the file size directly.                             |
| limit          | `{[key: string]: number}` |   no     | `{"application/zip": 1048576, "application/x-zip-compressed": 1048576}` | Limit for rendering the file MIME type in bytes.           |
| i18n           | `[languageCode: string]: {[key: string]: string;}`|   no     |    Translated messages                                                               | Translated service messages.                             |
| lang           | `en \| ru \| es \| zh \| ar \| fr`|   no     |    `'en'`                                                               | Language of service messages.                             |
| ...otherProps  | `any`                     |   no     |    `null`                                       | You can pass any additional props that you want.               |

## Example of usage

```tsx
import React from 'react';
import { DocRender } from "react-doc-render";

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

const CustomLoadingComponent: React.FC = () => {
    return <>Custom loading...</>;
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
    'yml': myCustomYmlRendererFunction,
};

const App = () => {
    return (
        <>
            <DocRender
                uri="./docker-compose.yml"
                loading={CustomLoadingComponent}
                message={customMessage}
                renderers={customRenderers}
                limit={limit}
                lang="ge"
                i18n={i18n}
                className="mx-auto"
                style={{ position: 'absolute' }}
            />
        </>
    );
};

export default App;

```