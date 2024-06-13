import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import { cacheAsync } from "./decorator"
import { z } from "zod"

export interface Post {
    id: string
    title: string
    content: string
    date: Date
    update: Date
    tags: string[]
    categories: string[]
    published: boolean
}

export const postsDirectory = path.join(process.cwd(), "_posts")

async function getAllIds() {
    const files = (await fs.readdir(postsDirectory)).filter((file) =>
        file.endsWith(".md"),
    )
    return files.map((file) => file.replace(/\.md$/, ""))
}

export async function getPostById(id: string): Promise<Post> {
    const filePath = path.join(postsDirectory, `${id}.md`)

    const [fileStat, gmMarkdown] = await Promise.all([
        fs.stat(filePath),
        fs.readFile(filePath, "utf-8"),
    ])

    const { data, content } = matter(gmMarkdown)

    /**
     * ! The schema of the front matter
     * @see https://hexo.io/zh-cn/docs/front-matter
     */
    const gmSchema = z.object({
        title: z.string().default(id),
        date: z.coerce.date().default(() => fileStat.birthtime),
        update: z.coerce.date().default(() => fileStat.mtime),
        tags: z
            .array(z.string())
            .nullable()
            .default([])
            .transform((t) => (t ? t : [])),
        categories: z
            .array(z.string())
            .nullable()
            .default([])
            .transform((t) => (t ? t : [])),
        published: z.boolean().default(true),
    })

    const parseResult = gmSchema.safeParse(data)

    if (!parseResult.success) {
        throw new Error(
            `Invalid front-matter format for post <<${id}>>, reason: ${parseResult.error}`,
        )
    }

    const post = { id, content, ...parseResult.data }

    return post
}

export async function getAllPosts() {
    const ids = await getAllIds()
    const all = await Promise.all(ids.map(getPostById))
    return all.sort((a, b) => b.date.getTime() - a.date.getTime())
}

// this make the build much faster
export const getAllCachedPosts = cacheAsync(getAllPosts)

export async function getTags() {
    const posts = await getAllCachedPosts()

    const tags: Record<string, Post[]> = {}

    for (const post of posts) {
        if (!post.tags) continue
        for (const tag of post.tags) {
            if (tags[tag]) {
                tags[tag].push(post)
            } else {
                tags[tag] = [post]
            }
        }
    }

    return Object.fromEntries(
        Object.entries(tags).sort((a, b) =>
            new Intl.Collator("zh-CN", {
                sensitivity: "base",
            }).compare(a[0], b[0]),
        ),
    )
}

export async function getArchives() {
    const posts = await getAllCachedPosts()

    const archive: Record<string, Post[]> = {}

    for (const post of posts) {
        const date = new Date(post.date)
        const year = date.getFullYear()
        if (archive[year]) {
            archive[year].push(post)
        } else {
            archive[year] = [post]
        }
    }
    return archive
}
