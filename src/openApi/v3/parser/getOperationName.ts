import camelCase from 'camelcase';

/**
 * Convert the input value to a correct operation (method) classname.
 * This will use the operation ID - if available - and otherwise fallback
 * on a generated name from the URL
 */
export const getOperationName = (url: string, method: string, operationId?: string, tag?: string): string => {
    if (operationId) {
        let transformedOperationId = operationId

        if (tag) {
            transformedOperationId = transformedOperationId
                .replace(new RegExp(`^${tag}_`), "")
        }

        transformedOperationId = transformedOperationId
            .replace(/^[^a-zA-Z]+/g, '')
            .replace(/[^\w\-]+/g, '-')
            .trim()

        return camelCase(transformedOperationId);
    }

    const urlWithoutPlaceholders = url
        .replace(/[^/]*?{api-version}.*?\//g, '')
        .replace(/{(.*?)}/g, '')
        .replace(/\//g, '-');

    return camelCase(`${method}-${urlWithoutPlaceholders}`);
};
