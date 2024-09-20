import DocRender from "./component/DocRender";

const Loading: React.FC = () => {
  return (
    <>Загрузка</>
  )
}

const myCustomJPGRenderer = () => {
  console.log('fire myCustomJPGRenderer')
}

const config = {
  loading: Loading,
  renderers: {
    'jpg': myCustomJPGRenderer,
  }
}

export default function App() {
  return (
    <main>
      <DocRender uri="https://raw.githubusercontent.com/sindresorhus/file-type/HEAD/media/logo.jpg" config={config} />
    </main>
  );
}
