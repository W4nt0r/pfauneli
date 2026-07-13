
export function getLocalized(value, language, fallback = '') {
    if (!value) return fallback;

    if (typeof value === 'string') {
        return value;
    }

    return value[language] || value.en || value.cz || fallback;
}