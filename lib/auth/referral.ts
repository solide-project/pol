export enum Charset {
    NUMBERS = 'numbers',
    ALPHABETIC = 'alphabetic',
    ALPHANUMERIC = 'alphanumeric',
}

const placeholder = '#';

const randomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const randomElement = <T>(array: ArrayLike<T>): T =>
    array[randomInt(0, array.length - 1)];

const charsets = {
    [Charset.NUMBERS]: '0123456789',
    [Charset.ALPHABETIC]: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    [Charset.ALPHANUMERIC]: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

export const charset = (name: Charset): string => charsets[name];

export const generateOne = ({
    pattern = placeholder.repeat(8),
    prefix = '',
    postfix = '',
}: {
    length?: number;
    count?: number;
    charset?: string;
    prefix?: string;
    postfix?: string;
    pattern?: string;
}): string => {
    // Uses for_of loop for performance reasons
    let code = '';
    for (const p of pattern) {
        const c = p === placeholder ? randomElement(charset(Charset.ALPHANUMERIC)) : p;
        code += c;
    }

    return `${prefix}${code}${postfix}`;
};
