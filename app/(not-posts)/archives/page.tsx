import { siteTitle } from "@/app/config"
import { getArchives } from "@/utils/generate"
import { Metadata } from "next"
import { Fragment } from "react"
import Link from "next/link"
import { format } from "date-fns/format"
import { formatISO } from "date-fns/formatISO"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Archives | ${siteTitle}`,
    }
}

export default async function Page() {
    const archives = await getArchives()

    return (
        <>
            {Object.entries(archives)
                .reverse()
                .map(([year, posts]) => (
                    <Fragment key={year}>
                        <a
                            className="text-black dark:text-white"
                            href={`#${year}`}
                        >
                            <h2
                                id={year}
                                className="sticky top-0 bg-white font-mono dark:bg-[var(--color-canvas-default)]"
                            >
                                {year}
                            </h2>
                        </a>
                        <ul>
                            {posts.map((post) => (
                                <li
                                    key={post.id}
                                    className="flex justify-between gap-2"
                                >
                                    <Link
                                        href={`/posts/${post.id}/`}
                                        className="flex-1 hover:underline"
                                    >
                                        {post.title}
                                    </Link>
                                    <time
                                        className="flex-shrink-0 py-0.5 text-xs text-gray-500 dark:text-stone-100"
                                        dateTime={formatISO(post.date)}
                                    >
                                        {format(post.date, "MM-dd")}
                                    </time>
                                </li>
                            ))}
                        </ul>
                    </Fragment>
                ))}
        </>
    )
}
