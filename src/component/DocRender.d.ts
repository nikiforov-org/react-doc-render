export interface DocRenderProps {
    uri: string;
    config?: {
        loading?: React.FC;
        renderers?: {
            [key: string]: Function;
        };
    };
}