import { siteTitle, baseUrl, description, profileImage } from "@/app/config"
import { getAllCachedPosts } from "./generate"
import { parseMarkdown } from "./markdownParser"

export async function jsonFeed(filename: string = "feed.json") {
    const posts = await getAllCachedPosts()
    return {
        version: "https://jsonfeed.org/version/1.1",
        title: siteTitle,
        home_page_url: baseUrl,
        description,
        favicon: baseUrl + profileImage.replace(/^\//, ""),
        feed_url: baseUrl + filename,
        items: await Promise.all(
            posts.map(async (post) => ({
                id: post.id,
                url: baseUrl + "posts/" + post.id,
                title: post.title,
                date_published: post.date.toISOString(),
                date_modified: post.update.toISOString(),
                content_text: await parseMarkdown(post.content, true),
                tags: post.tags,
            })),
        ),
    }
}
