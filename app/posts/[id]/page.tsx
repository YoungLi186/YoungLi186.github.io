import "./page.scss"

import Link from "next/link"
import { Metadata, ResolvingMetadata } from "next"
import { getAllPosts, getPostById } from "@/utils/generate"
import { parseMarkdown } from "@/utils/markdownParser"
import { siteTitle } from "@/app/config"
import BackLink from "@/components/BackLink"
import Waline from "@/components/Waline"
import BottomLinks from "@/components/BottomLinks"
import BackToTop from "@/components/BackToTop"
import {
    GgTime,
    GgTag,
    GgEye,
    SvgSpinners180RingWithBg,
} from "@/components/icons"
import { format } from "date-fns/format"
import { formatISO } from "date-fns/formatISO"
import { ListenTOC } from "./toc"
import { walineServerURL } from "@/app/config"

/**
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
 * issue: https://github.com/vercel/next.js/issues/56253
 */
export const dynamic = "force-static"
export const dynamicParams = false
export async function generateStaticParams() {
    const posts = await getAllPosts()

    return posts.map((post) => ({
        id: post.id,
    }))
}

export async function generateMetadata(
    { params }: { params: { id: string } },
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const id = decodeURIComponent(params.id)
    const post = await getPostById(id)
    const title = `${post.published ? "" : `[DRAFT] `}${post.title} | ${siteTitle}`

    return {
        title,
        openGraph: {
            images: `https://og-image.vercel.app/${encodeURI(
                title,
            )}.png?${new URLSearchParams({
                theme: "light",
                md: "0",
                fontSize: "75px",
            })}`,
        },
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = decodeURIComponent(params.id)
    const post = await getPostById(id)
    const html = await parseMarkdown(post.content)
    const path = `/posts/${id}` // server component, so not using `usePathname()`

    return (
        <>
            <article className="container mx-auto px-4" data-pagefind-body>
                <section className="py-4">
                    <h1 className="mx-auto py-6 text-center">{post.title}</h1>

                    <div
                        className="mb-6 flex items-center justify-center gap-3 text-sm"
                        data-pagefind-ignore="all"
                    >
                        <div className="flex items-center gap-1 whitespace-nowrap">
                            <GgTime />
                            <time
                                className="py-0.5 text-gray-500 dark:text-stone-100"
                                dateTime={formatISO(post.date)}
                            >
                                {format(post.date, "LLLL d, yyyy")}
                            </time>
                        </div>
                        {post.tags?.length > 0 && (
                            <div className="flex items-center gap-1 whitespace-nowrap">
                                <GgTag />
                                <span className="inline-block max-w-[600px] overflow-x-auto">
                                    {post.tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/tags/${tag}`}
                                            className="mr-1 hover:underline"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </span>
                            </div>
                        )}
                        {walineServerURL && (
                            <div className="flex items-center gap-1 whitespace-nowrap">
                                <GgEye />
                                <span
                                    className="waline-pageview-count text-gray-500 dark:text-stone-100"
                                    data-path={path}
                                >
                                    <SvgSpinners180RingWithBg />
                                </span>
                            </div>
                        )}
                    </div>
                </section>
                {/* refer it's css in page.scss */}
                <section
                    className="blog-article"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
                <section className="$markdownParser$ md:max-w-[80%] lg:mx-4">
                    <div className="mx-1 mb-4 mt-8">
                        <BackLink />
                    </div>
                    {walineServerURL && (
                        <Waline key={path} serverURL={walineServerURL} />
                    )}
                    <BottomLinks className="py-2" />
                </section>
            </article>

            <BackToTop />
            <ListenTOC />
        </>
    )
}
