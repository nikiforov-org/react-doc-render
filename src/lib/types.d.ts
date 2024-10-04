// types.d.ts
export interface SetContentFunction {
    html: string;
    callback?: () => void;
}

export type RendererFunction = (
    buffer: ArrayBuffer,
    setContent: React.Dispatch<React.SetStateAction<SetContentFunction | null>>,
    mimeType: string
) => Promise<void>;

export interface MessageFunction {
    (text: string, type: 'default' | 'success' | 'error');
}

export interface DocRenderProps extends React.HTMLAttributes<HTMLDivElement> {
    uri: string;
    loading?: React.FC;
    message?: MessageFunction;
    renderers?: {
        [key: string]: Renderer;
    };
    i18n?: {
        [key: string]: {
            [key: string]: string;
        };
    };
    limit?: {
        [key: string]: number;
    }
    lang?: string;
    mime?: string;
    size?: number;
}