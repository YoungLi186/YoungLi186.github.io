import { siteTitle } from "@/app/config"
import { getTags } from "@/utils/generate"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: `Tags | ${siteTitle}`,
}

export default async function Page() {
    const tags = await getTags()

    return (
        <>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {Object.entries(tags).map(([tag, posts]) => (
                    <li key={tag}>
                        <Link
                            href={`/tags/${tag}/`}
                            className="inline-flex gap-2"
                        >
                            <span className="hover:underline">{tag}</span>
                            <small>({posts.length})</small>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
