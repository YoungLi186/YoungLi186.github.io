import { Post } from "@/utils/generate"
import Link from "next/link"
import { format } from "date-fns/format"
import { formatISO } from "date-fns/formatISO"

export default function PostsList({ posts }: { posts: Post[] }) {
    return (
        <ul className="my-1 flex flex-col gap-2">
            {posts.map(({ id, date, title }) => (
                <li key={id}>
                    <Link href={`/posts/${id}/`} className="flex flex-col">
                        <span className="hover:underline">{title}</span>
                        <small className="text-sm">
                            <time
                                className="py-0.5 text-gray-500 dark:text-stone-100"
                                dateTime={formatISO(date)}
                            >
                                {format(date, "LLLL d, yyyy")}
                            </time>
                        </small>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
