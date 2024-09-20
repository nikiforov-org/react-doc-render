// index.d.ts
declare module 'react-doc-render' {
    import { FC } from 'react';

    export interface DocRenderProps {
        uri: string;
        config?: {
            loading?: FC;
            renderers?: {
                [key: string]: Function;
            };
        };
    }

    export const DocRender: FC<DocRenderProps>;
}
