// renderers/text.tsx
const text = async (buffer: ArrayBuffer, setContent: React.Dispatch<React.SetStateAction<string | null>>, extension: string) => {
    const decoder = new TextDecoder('utf-8');
    const textContent = decoder.decode(buffer);
    setContent(`<pre>${textContent}</pre>`);
};

export default text;
