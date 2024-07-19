export interface GitHub {
    base: string;
    user: string;
    repo: string;
    branch: string;
    path: string;
}

export const parse = (url: string) => {
    const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(\/tree\/([^\/]+)\/(.*))?$/;
    const match = url.match(regex);

    if (!match) {
        throw new Error('Invalid GitHub URL');
    }

    return {
        base: 'https://github.com',
        user: match[1],
        repo: match[2],
        branch: match[4] || 'master',
        path: match[5] || ''
    };
}