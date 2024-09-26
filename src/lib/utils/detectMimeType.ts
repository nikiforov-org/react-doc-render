import JSZip from 'jszip';
import magicNumbers from './magicNumbers.json';

const getMagicNumber = async (arrayBuffer: ArrayBuffer, length: number = 8): Promise<string> => {
    const bytes = new Uint8Array(arrayBuffer, 0, length);
    return Array.from(bytes)
        .map(byte => byte.toString(16).toUpperCase().padStart(2, '0'))
        .join(' ');
};

const fileSignatures: Record<'docx' | 'xlsx' | 'pptx', string> = {
    'docx': 'word/document.xml',
    'xlsx': 'xl/workbook.xml',
    'pptx': 'ppt/presentation.xml'
};

const checkZipFileType = async (zip: JSZip): Promise<string | undefined> => {
    return (Object.keys(fileSignatures) as Array<keyof typeof fileSignatures>).find(format => zip.files[fileSignatures[format]]) || undefined;
};

export const detectMimeType = async (arrayBuffer: ArrayBuffer): Promise<string | undefined> => {
    const magicNumber = await getMagicNumber(arrayBuffer);

    for (const [ext, signatures] of Object.entries(magicNumbers)) {
        if (signatures.some(signature => magicNumber.startsWith(signature))) {
            if (signatures.includes("50 4B 03 04")) {
                const zip = await JSZip.loadAsync(arrayBuffer);
                return await checkZipFileType(zip) || ext;
            }
            return ext;
        }
    }

    return undefined;
};
