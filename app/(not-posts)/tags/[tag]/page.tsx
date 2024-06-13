import { getTags } from "@/utils/generate"
import PostsList from "@/components/PostsList"
import { siteTitle } from "@/app/config"
import { Metadata } from "next"

export const dynamic = "force-static"
export const dynamicParams = false
export async function generateStaticParams() {
    const tags = await getTags()

    return Object.keys(tags).map((tag) => ({
        tag,
    }))
}

export async function generateMetadata({
    params: { tag },
}: {
    params: { tag: string }
}): Promise<Metadata> {
    return {
        title: `${decodeURIComponent(tag)} | ${siteTitle}`,
    }
}

export default async function Page({ params }: { params: { tag: string } }) {
    const tags = await getTags()
    const tag = decodeURIComponent(params.tag)
    const posts = tags[tag]

    return (
        <>
            <h2 className="sticky top-0 bg-white font-mono dark:bg-[var(--color-canvas-default)]">
                Tag: {tag}
            </h2>
            <PostsList posts={posts} />
        </>
    )
}
