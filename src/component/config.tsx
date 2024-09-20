const Loading: React.FC = () => {
    return (
        <>Loading...</>
    )
}

const defaultConfig = {
    loading: Loading,
    renderers: {
        'jpg': () => { console.log('jpg inside') }
    }
}

export default defaultConfig;