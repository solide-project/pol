import { GitHubFileInfo } from "./interface"
import { parse } from "./parser"

export const githubContent = async (url: string): Promise<GitHubFileInfo[]> => {
    const parsed = parse(url)

    // const api = `https://api.github.com/repos/${parsed.user}/${parsed.repo}/contents/${parsed.path}`
    // return content(api)
    return [
        {
            "name": "01_hello_word",
            "path": "content/01_hello_word",
            "sha": "3fa7078cbaeccf7e6f6268fa56f1d3636c03de99",
            "size": 0,
            "url": "https://api.github.com/repos/5208980/learn3-template/contents/content/01_hello_word?ref=master",
            "html_url": "https://github.com/5208980/learn3-template/tree/master/content/01_hello_word",
            "git_url": "https://api.github.com/repos/5208980/learn3-template/git/trees/3fa7078cbaeccf7e6f6268fa56f1d3636c03de99",
            "download_url": "",
            "type": "dir",
            "_links": {
                "self": "https://api.github.com/repos/5208980/learn3-template/contents/content/01_hello_word?ref=master",
                "git": "https://api.github.com/repos/5208980/learn3-template/git/trees/3fa7078cbaeccf7e6f6268fa56f1d3636c03de99",
                "html": "https://github.com/5208980/learn3-template/tree/master/content/01_hello_word"
            }
        },
        {
            "name": "02_struct",
            "path": "content/02_struct",
            "sha": "6aaac9256fd16bb4b9fa2a3d74fd01850049e525",
            "size": 0,
            "url": "https://api.github.com/repos/5208980/learn3-template/contents/content/02_struct?ref=master",
            "html_url": "https://github.com/5208980/learn3-template/tree/master/content/02_struct",
            "git_url": "https://api.github.com/repos/5208980/learn3-template/git/trees/6aaac9256fd16bb4b9fa2a3d74fd01850049e525",
            "download_url": "",
            "type": "dir",
            "_links": {
                "self": "https://api.github.com/repos/5208980/learn3-template/contents/content/02_struct?ref=master",
                "git": "https://api.github.com/repos/5208980/learn3-template/git/trees/6aaac9256fd16bb4b9fa2a3d74fd01850049e525",
                "html": "https://github.com/5208980/learn3-template/tree/master/content/02_struct"
            }
        },
        {
            "name": "03_multiple",
            "path": "content/03_multiple",
            "sha": "20e0fa08d11cdbad25ea097c414fea2e341b248d",
            "size": 0,
            "url": "https://api.github.com/repos/5208980/learn3-template/contents/content/03_multiple?ref=master",
            "html_url": "https://github.com/5208980/learn3-template/tree/master/content/03_multiple",
            "git_url": "https://api.github.com/repos/5208980/learn3-template/git/trees/20e0fa08d11cdbad25ea097c414fea2e341b248d",
            "download_url": "",
            "type": "dir",
            "_links": {
                "self": "https://api.github.com/repos/5208980/learn3-template/contents/content/03_multiple?ref=master",
                "git": "https://api.github.com/repos/5208980/learn3-template/git/trees/20e0fa08d11cdbad25ea097c414fea2e341b248d",
                "html": "https://github.com/5208980/learn3-template/tree/master/content/03_multiple"
            }
        }
    ]
}

export const content = async (url: string): Promise<GitHubFileInfo[]> => {
    const options = header()
    const response = await fetch(url, options)
    return await response.json()
}

export const header = (method: string = "GET"): any => {
    var headers = new Headers()
    headers.append("Authorization", `Bearer ${process.env.GITHUB_API_KEY}`)

    return {
        method,
        headers
    } as any
}