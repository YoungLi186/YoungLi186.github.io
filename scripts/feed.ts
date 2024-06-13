import { jsonFeed } from "../utils/jsonFeed"
import fs from "node:fs/promises"
import path from "node:path"

export const genFeed = async () => {
    const filepath = path.join(__dirname, "../out/feed.json")
    const data = await jsonFeed()
    await fs.writeFile(filepath, JSON.stringify(data))
    return filepath
}

if (require.main === module) {
    console.log("Generating feed...")
    genFeed().then(
        (path) => console.log(`Done! Generated to ${path}`),
        (e) => console.error(e),
    )
}
