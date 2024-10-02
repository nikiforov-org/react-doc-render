// components/renderers/zip.ts
import { RendererFunction } from '../types';
import JSZip from 'jszip';

interface FileNode {
    id: string;
    label: string;
    children?: FileNode[];
    isOpen?: boolean;
}

const zip: RendererFunction = async (buffer: ArrayBuffer, setContent: (content: { html: string; callback: () => void }) => void, mimeType: string) => {
    const zip = await JSZip.loadAsync(buffer);
    const files = createFileTree(zip.files);
    const html = `<div id="rdr-content" class="rdr-content-zip">${renderZipTree(files)}</div>`;
    const callback = () => console.log(`${mimeType} файл успешно отрендерен`);

    setContent({ html, callback });
};

const createFileTree = (files: { [key: string]: JSZip.JSZipObject }): FileNode[] => {
    const root: FileNode = { id: '0', label: 'Archive', children: [] };

    Object.entries(files).forEach(([path, file]) => {
        const parts = path.split('/');
        let currentNode = root;

        parts.forEach((part, index) => {
            const isLast = index === parts.length - 1;
            const existingChild = currentNode.children?.find(child => child.label === part);

            if (existingChild) {
                currentNode = existingChild;
            } else {
                const newNode: FileNode = {
                    id: `${currentNode.id}-${(currentNode.children?.length || 0)}`,
                    label: part,
                    children: isLast ? undefined : [],
                };

                currentNode.children = currentNode.children || [];

                if (!isLast) {
                    currentNode.children.unshift(newNode);
                    currentNode = newNode;
                } else {
                    if (newNode.label) {
                        currentNode.children.push(newNode);
                    }
                }
            }
        });
    });

    sortNodes(root);

    return root.children || [];
};

const sortNodes = (node: FileNode) => {
    if (node.children) {
        node.children.sort((a, b) => {
            const hasChildrenA = !!a.children;
            const hasChildrenB = !!b.children;

            if (hasChildrenA === hasChildrenB) {
                return a.label.localeCompare(b.label);
            }

            return hasChildrenA ? -1 : 1;
        });

        node.children.forEach(sortNodes);
    }
};


const renderZipTree = (files: FileNode[]): string => {
    return files.map(file => {
        if (file.children) {
            return `<div class="folder">
                <input type="checkbox" id="${file.id}" />
                <label for="${file.id}">${file.label}</label>
                <div class="folder-children">${renderZipTree(file.children)}</div>
            </div>`
        } else {
            return `<div class="file">${file.label}</div>`
        }
    }).join('');
};

export default zip;
