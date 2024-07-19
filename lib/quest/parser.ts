import { GithubTreeInfo, isTree } from "../git";
import { QuestTitle } from "./interface";
import { joinUri } from "./utils";

export const generateQuestContractPath = (item: QuestTitle, owner: string, name: string, parent?: QuestTitle) => {
    const source = `https://github.com/${owner}/${name}/blob/master/contract`
    const paths = [source]
    if (parent) paths.push(parent.name)
    paths.push(item.name)

    return joinUri(...paths)
}

export const validateTree = (tree: GithubTreeInfo): boolean => {
    if (!tree.tree) {
        return false
    }

    if (!tree.tree.some((item) => item.path === "content" && isTree(item))) {
        return false
    }
    return true;
}