const formatFileSize = (sizeInBytes: number): string => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;
    let size = sizeInBytes;

    while (size >= 1024 && index < units.length - 1) {
        size /= 1024;
        index++;
    }

    return `${size.toFixed(2)} ${units[index]}`;
};

export default formatFileSize;