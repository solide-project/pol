import { GithubClient } from "./client"

export interface GithubBranch {
    name: string;
    commit: {
        sha: string;
        url: string;
    };
    protected: boolean;
}

export const branches = async (owner: string, name: string): Promise<GithubBranch[]> => {
    const client = GithubClient();
    const response = await fetch(`${client.apiUrl}/${owner}/${name}/branches`, {
        ...client.header(),
        cache: "no-store",
    })
    return await response.json()
}
