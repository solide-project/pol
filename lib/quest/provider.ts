import path from "path"
import { GithubTreeItem, isTree } from "../git"
import { QuestTitle } from "./interface"
import { parseTitle } from "./utils";

// note this will failed if the if /content/something/content
export const stripBase = (tree: GithubTreeItem[], base: string): GithubTreeItem[] => {
    return tree
        .filter(item => item.path.startsWith(base) && isTree(item))
        .map(item => ({ ...item, path: item.path.replace(base, "") }))
}

// Get all based folders and parse the title
export const folderItems = (tree: GithubTreeItem[]): QuestTitle[] => {
    return tree
        .filter(item => {
            const { dir, name } = path.parse(item.path)
            return !dir && name
        })
        .map(item => {
            const { base } = path.parse(item.path)
            return parseTitle(base);
        })
        .filter(item => item !== null)
}