# react-doc-render
It's a lightweight React library for rendering documents of various popular MIME types directly in the browser. It supports formats such as PDF, images (JPEG, PNG, GIF), text files, and Microsoft Office documents (Word, Excel, PowerPoint), providing a simple and unified interface to handle different content types.

## Installation

`npm install react-doc-render `

## Usage
1. Import

`import { DocRender } from 'react-doc-render'`

2. Add to render section

`<DocRender uri={uri} />`

## Configuration

```
const MyCustomLoadingComponent: React.FC = () => {
  return (
      <>Custom loading...</>
  )
}

const myCustomJPGRenderer = () => {
  console.log('hello myCustomJPGRenderer!')
}

const config = {
  loading: MyCustomLoadingComponent,
  renderers: {
    'jpg': myCustomJPGRenderer,
  }
}

<DocRender uri={uri} config={config} />
```