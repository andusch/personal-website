export function formatDate(dateString: string) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    } catch {
        return dateString;
    }
}

export function formatDateWithDay(dateString: string) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    } catch {
        return dateString;
    }
}