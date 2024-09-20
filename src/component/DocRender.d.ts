export interface DocRenderProps {
    uri: string;
    config?: {
        loading: React.ComponentType;
        renderers: {
            [key: string]: Function;
        };
    };
}