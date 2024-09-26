// renderers/image.tsx
const image = async (buffer: ArrayBuffer, setContent: React.Dispatch<React.SetStateAction<string | null>>, extension: string) => {
    const blob = new Blob([buffer], { type: `image/${extension}` });
    const url = URL.createObjectURL(blob);

    const imgHTML = `<img src="${url}" alt="" />`;
    setContent(imgHTML);
};

export default image;
