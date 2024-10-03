export function formatForInputDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function formatNumberToGroupsOfFour(numberString: string | undefined) {
    if (!numberString) return;
    return numberString.replace(/(\d{4})(?=\d)/g, '$1 ');
}


export function getFileExtension(mimeType: string): string | null {
    // Split the MIME type string by '/' and return the second part
    const parts = mimeType.split('/');
    return parts.length === 2 ? parts[1] : null;
  }

