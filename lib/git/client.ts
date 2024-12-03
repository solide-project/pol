import { GitHubFileInfo } from "./interface"

export const GithubClient = () => {
    return {
        apiUrl: "https://api.github.com/repos",
        header: (method: string = "GET") => {
            var headers = new Headers()
            headers.append("Authorization", `Bearer ${process.env.GITHUB_API_KEY}`)

            return {
                method,
                headers
            }
        }
    }
}

export const content = async (url: string): Promise<GitHubFileInfo[]> => {
    const options = header()
    const response = await fetch(url, options)
    return await response.json()
}

export const header = (method: string = "GET") => {
    var headers = new Headers()
    headers.append("Authorization", `Bearer ${process.env.GITHUB_API_KEY}`)

    return {
        method,
        headers
    }
}