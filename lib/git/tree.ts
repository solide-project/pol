import { header } from "./client"
import { parse } from "./parser"

export interface GithubTreeInfo {
    sha: string
    url: string
    tree: GithubTreeItem[]
    truncated: boolean
}

export interface GithubTreeItem {
    path: string
    mode: string
    type: string
    sha: string
    url: string
}


export const isTree = (tree: GithubTreeItem) => tree.type === "tree";
export const isBlob = (tree: GithubTreeItem) => tree.type === "blob";

export const githubTrees = async (owner: string, name: string): Promise<GithubTreeInfo> => {
    const api = `https://api.github.com/repos/${owner}/${name}/git/trees/master?recursive=2`
    return trees(api)
}

export const trees = async (url: string): Promise<GithubTreeInfo> => {
    const options = header()
    const response = await fetch(url, {
        ...options,
        // cache: "no-store",
    })
    return await response.json()
}