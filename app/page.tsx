import { getAllPosts } from "@/utils/generate"
import PostsList from "@/components/PostsList"
import BottomLinks from "@/components/BottomLinks"

export default async function Home() {
    const posts = await getAllPosts()
    return (
        <>
            <main className="container mx-auto max-w-[767px] px-4">
                <section className="py-2 font-sans">
                    <h2 className="sticky top-0 flex flex-wrap items-center justify-between bg-white font-mono dark:bg-[var(--color-canvas-default)]">
                        <span>Blog</span>
                        <small className="bg-gradient-to-br from-[#e0f2fe] to-[#66ccff] bg-clip-text text-xs font-extrabold text-transparent underline decoration-wavy opacity-60">
                            Powered by Next.js
                        </small>
                    </h2>
                    <PostsList posts={posts} />
                </section>
                <section className="py-2">
                    <BottomLinks />
                </section>
            </main>
        </>
    )
}
